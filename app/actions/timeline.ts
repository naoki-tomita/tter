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
  const results = db.prepare<[number], TweetEntity>(`
    SELECT t.id, t.content, t.user_id, t.created_at, u.name as user_name FROM tweets t
    JOIN users u ON t.user_id = u.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC;
  `).all(userId);
  return results.map(it => ({
    id: it.id,
    content: it.content,
    user: {
      id: it.user_id,
      name: it.user_name,
    },
    createdAt: it.created_at,
  }))
}

export async function post(content: string) {
  const userId = await getCurrentUserId();
  db.prepare("INSERT INTO tweets (user_id, content) VALUES (?, ?);").run(userId, content);
}
