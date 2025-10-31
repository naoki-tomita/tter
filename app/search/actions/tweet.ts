"use server";
import { Tweet, tweets } from "../../../libs/db/tweet";

export async function search(query?: string): Promise<Tweet[]> {
  if (!query) {
    return [];
  }
  return tweets.search(query);
}
