"use server";

import { likes } from "../db/like";
import { getCurrentUserId } from "./user";

export async function like(tweetId: number) {
  const userId = await getCurrentUserId();
  if (userId == null) throw new Error("User not found");
  await likes.like(userId, tweetId);
}
