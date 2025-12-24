import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { db } from "../libs/Database";

async function initialize() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS __migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      executed_at NUMERIC DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function migrated(name: string) {
  await db.execute(`INSERT INTO __migrations (name) VALUES (?);`, [name]);
}

async function isMigrated(name: string): Promise<boolean> {
  const { rows } = await db.execute(`SELECT * FROM __migrations WHERE name = ?;`, [name]);
  return (rows.length) > 0;
}

async function main() {
  await initialize();

  const currentDir = join(import.meta.dirname, "./");
  const files = await readdir(currentDir);
  const queries = files.filter(it => it.endsWith(".sql"));
  for (const filename of queries) {
    const filePath = join(currentDir, filename);
    const query = await readFile(filePath, "utf-8");
    if (await isMigrated(filename)) {
      console.log(`[skipped] ${filename}`);
      continue;
    }
    console.log(`[migrating] ${filename}`);

    const tx = await db.transaction("write");
    try {
      await tx.executeMultiple(query);
      console.log(`[committed] ${filename}`);
      await tx.commit();
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      tx.close();
    }
    await migrated(filename);
  }
}

main();
