import { Tweet, tweets } from "../../../../libs/db/tweet";

export async function getUserTweets(userId: number): Promise<Tweet[]> {
  return tweets.findByUserId(userId);
}
