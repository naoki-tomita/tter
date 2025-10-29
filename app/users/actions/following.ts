"use server";
import { follows } from "../../../libs/db/following";

export async function followees(followerId: number) {
  return follows.followees(followerId);
}
