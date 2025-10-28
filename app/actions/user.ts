"use server";

import { headers } from "next/headers";
import { User, users } from "../../libs/db/user";

export async function getCurrentUserId(): Promise<number | null> {
  const userIdString = await headers().then(it => it.get("X-User-Id")).then(it => it ? parseInt(it, 10) : null);
  return userIdString;
}

export async function getCurrentUser(): Promise<User | undefined> {
  const userId = await getCurrentUserId();
  if (userId == null) return undefined;
  return users.findById(userId);
}
