"use server";

import { db } from "../../util/Database";
import { getCurrentUserId } from "./user";

type User = {
  id: number;
  name: string;
}

export type Tweet = {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

type TweetEntity = {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  created_at: string;
}

export async function getTimelines(): Promise<Tweet[]> {
  const userId = await getCurrentUserId();
  const result = await db.execute(`
    SELECT t.id, t.content, t.user_id, t.created_at, u.name as user_name FROM tweets t
    JOIN users u ON t.user_id = u.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC;
  `, [userId])
  return result.rows
    .map(it => it as unknown as TweetEntity)
    .map((it) => ({
      id: it.id as number,
      content: it.content as string,
      user: {
        id: it.user_id as number,
        name: it.user_name as string,
      },
      createdAt: it.created_at as string,
    }));
}

export async function post(content: string) {
  const userId = await getCurrentUserId();
  await db.execute("INSERT INTO tweets (user_id, content) VALUES (?, ?);", [userId, content]);
}
