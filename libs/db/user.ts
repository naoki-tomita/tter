import { db } from "../Database";

export type User = {
  id: number;
  name: string;
}

export const users = {
  async findById(userId: number): Promise<User | undefined> {
    const { rows: [user] } = await db.execute("SELECT * FROM users WHERE id = ?", [userId]);
    return {
      id: user.id as number,
      name: user.name as string,
    };
  },
  async create(name: string, email: string, passwordHash: string) {
    await db.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, passwordHash]);
  },
  async findByEmailAndPasswordHash(email: string, passwordHash: string): Promise<User | undefined> {
    const { rows } = await db.execute("SELECT * FROM users WHERE email = ? AND password_hash = ?", [email, passwordHash]);
    return {
      id: rows[0].id as number,
      name: rows[0].name as string,
    };
  }
}
