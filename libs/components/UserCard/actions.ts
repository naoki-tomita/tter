"use server";
import { follows } from "../../db/following";

export async function follow(followerId: number, followeeId: number): Promise<void> {
  return follows.follow(followerId, followeeId);
}

export async function unfollow(followerId: number, followeeId: number): Promise<void> {
  return follows.unfollow(followerId, followeeId);
}
