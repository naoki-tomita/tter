"use server";

import { User, users } from "../../libs/db/user";
import { getCurrentUserId } from "../../libs/actions/user";

export async function getCurrentUser(): Promise<User | undefined> {
  const userId = await getCurrentUserId();
  if (userId == null) return undefined;
  return users.findById(userId);
}
