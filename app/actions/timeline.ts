"use server";

import { tweets, Tweet } from "../../libs/db/tweet";
import { getCurrentUserId } from "./user";

export async function getTimelines(): Promise<Tweet[]> {
  const userId = await getCurrentUserId();
  return tweets.findTimelines(userId);
}

export async function post(content: string) {
  const userId = await getCurrentUserId();
  return tweets.create(userId, content);
}
