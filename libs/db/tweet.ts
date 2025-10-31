import { db } from "../Database";
import { User } from "./user";

export type Tweet = {
  id: number;
  user: User;
  content: string;
  createdAt: string;
};

function toTweet(row: any): Tweet {
  return {
    id: row.id as number,
    content: row.content as string,
    user: {
      id: row.user_id as number,
      name: row.user_name as string,
      bio: row.user_bio as string | undefined,
    },
    createdAt: row.created_at as string,
  };
}

export const tweets = {
  async findTimelines(userId: number): Promise<Tweet[]> {
    const { rows } = await db.execute(
      `
      SELECT
        t.id,
        t.content,
        t.user_id,
        strftime('%Y-%m-%dT%H:%M:%SZ', t.created_at) as created_at,
        u.name as user_name,
        u.bio as user_bio
      FROM tweets t
      JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ? OR t.user_id in (
        SELECT followee_id FROM followings WHERE follower_id = ?
      )
      ORDER BY t.created_at DESC;
    `,
      [userId, userId],
    );

    return rows.map(toTweet);
  },
  async findByUserId(userId: number): Promise<Tweet[]> {
    const { rows } = await db.execute(
      `
      SELECT
        t.id,
        t.content,
        t.user_id,
        t.created_at,
        u.name as user_name,
        u.bio as user_bio
      FROM tweets t
      JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ?
      ORDER BY t.created_at DESC;
    `,
      [userId],
    );

    return rows.map(toTweet);
  },

  async create(userId: number, content: string) {
    await db.execute("INSERT INTO tweets (user_id, content) VALUES (?, ?);", [userId, content]);
  },

  async search(query: string): Promise<Tweet[]> {
    const { rows } = await db.execute(
      `
      SELECT
        t.id,
        t.content,
        t.user_id,
        t.created_at,
        u.name as user_name,
        u.bio as user_bio
      FROM tweets t
      JOIN users u ON t.user_id = u.id
      WHERE t.content LIKE ?
      ORDER BY t.created_at DESC;
    `,
      [`%${query}%`],
    );

    return rows.map(toTweet);
  },
};
