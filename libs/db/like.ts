import { db } from "../Database";

export const likes = {
  async like(userId: number, tweetId: number) {
    await db.execute("INSERT INTO likes (user_id, tweet_id) VALUES (?, ?);", [userId, tweetId]);
  }
}
