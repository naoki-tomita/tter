"use server";
import { Tweet, tweets } from "../../../libs/db/tweet";

export async function search(query: string): Promise<Tweet[]> {
  return tweets.search(query);
}
