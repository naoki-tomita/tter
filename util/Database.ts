import Sqlite3 from "better-sqlite3";
export const db = new Sqlite3("tter.db");

function initialize() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL,
      email text NOT NULL UNIQUE,
      password_hash text NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tweets (
      id integer PRIMARY KEY AUTOINCREMENT,
      user_id integer NOT NULL,
      content text NOT NULL,
      created_at datetime DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
}

initialize();
