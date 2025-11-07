"use server";

import { users } from "../../../libs/db/user";

export async function getUsers() {
  return users.findAll();
}
