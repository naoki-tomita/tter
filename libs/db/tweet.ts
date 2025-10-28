import { db } from "../Database";
import { User } from "./user";

export type Tweet = {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

export const tweets = {
  async findByUserId(userId: number): Promise<Tweet[]> {
    const { rows } = await db.execute(`
      SELECT t.id, t.content, t.user_id, t.created_at, u.name as user_name FROM tweets t
      JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ?
      ORDER BY t.created_at DESC;
    `, [userId]);

    return rows.map(it => ({
      id: it.id as number,
      content: it.content as string,
      user: {
        id: it.user_id as number,
        name: it.user_name as string,
      },
      createdAt: it.created_at as string,
    }));
  },

  async create(userId: number, content: string) {
    await db.execute("INSERT INTO tweets (user_id, content) VALUES (?, ?);", [userId, content]);
  }
}
