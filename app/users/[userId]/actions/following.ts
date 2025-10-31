"use server";
import { follows } from "../../../../libs/db/following";

export async function isFollowing(
  followerId: number,
  followeeId: number,
): Promise<boolean> {
  return follows.isFollowing(followerId, followeeId);
}
