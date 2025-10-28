import { unfollow } from "../../app/users/[userId]/actions/following";
import { db } from "../Database";

export const follows = {
  async isFollowing(followerId: number, followeeId: number): Promise<boolean> {
    const { rows } = await db.execute(
      "SELECT COUNT(*) as count FROM followings WHERE follower_id = ? AND followee_id = ?;",
      [followerId, followeeId]
    );
    return (rows[0].count as number) > 0;
  },

  async follow(followerId: number, followeeId: number): Promise<void> {
    await db.execute(
      "INSERT INTO followings (follower_id, followee_id) VALUES (?, ?);",
      [followerId, followeeId]
    );
  },

  async unfollow(followerId: number, followeeId: number): Promise<void> {
    await db.execute(
      "DELETE FROM followings WHERE follower_id = ? AND followee_id = ?;",
      [followerId, followeeId]
    );
  }
}
