"use server";
import { headers } from "next/headers";
import { db } from "../../util/Database";

export type User = {
  id: number;
  name: string;
}

export async function getCurrentUserId(): Promise<number | null> {
  const userIdString = await headers().then(it => it.get("X-User-Id")).then(it => it ? parseInt(it, 10) : null);
  return userIdString;
}

export async function getCurrentUser() {
  const userId = await getCurrentUserId();
  return db.prepare<[number], User>("SELECT id, name FROM users WHERE id = ?").get(userId);
}
