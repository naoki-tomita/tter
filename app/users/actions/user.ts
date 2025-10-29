"use server";

import { headers } from "next/headers";
import { users } from "../../../libs/db/user";

export async function getUsers() {
  return users.findAll();
}

export async function getCurrentUserId(): Promise<number | null> {
  const userIdString = await headers().then(it => it.get("X-User-Id")).then(it => it ? parseInt(it, 10) : null);
  return userIdString;
}
