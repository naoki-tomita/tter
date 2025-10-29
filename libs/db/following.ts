import { db } from "../Database";
import { User } from "./user";

export const follows = {
  async isFollowing(followerId: number, followeeId: number): Promise<boolean> {
    const { rows } = await db.execute(
      "SELECT COUNT(*) as count FROM followings WHERE follower_id = ? AND followee_id = ?;",
      [followerId, followeeId]
    );
    return (rows[0].count as number) > 0;
  },

  async followees(followerId: number): Promise<User[]> {
    const { rows } = await db.execute(`
        SELECT f.followee_id, u.name, u.bio FROM followings f
        JOIN users u ON f.followee_id = u.id
        WHERE f.follower_id = ?;
      `,
      [followerId]
    );
    return rows.map(row => ({
      id: row.followee_id as number,
      name: row.name as string,
      bio: row.bio as string | undefined,
    }));
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
