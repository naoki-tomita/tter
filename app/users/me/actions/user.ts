"use server";

import { redirect } from "next/navigation";
import { users } from "../../../../libs/db/user";
import { getCurrentUserId } from "../../../../libs/actions/user";

export async function updateUser(formData: FormData) {
  const userId = await getCurrentUserId();
  const name = formData.get("name");
  const bio = formData.get("bio");
  await users.update(userId, name as string, bio as string | undefined);
  redirect("/users/me");
}
