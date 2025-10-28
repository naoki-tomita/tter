"use server";

import { redirect } from "next/navigation";
import { TODO } from "../../../../libs/todo";
import { users } from "../../../../libs/db/user";
import { createPasswordHash } from "../../../../libs/password";

export async function createUser(form: FormData) {
  const name = form.get("name")?.toString() ?? TODO();
  const email = form.get("email")?.toString() ?? TODO();
  const password = form.get("password")?.toString() ?? TODO();
  const passwordHash = createPasswordHash(password);

  await users.create(name, email, passwordHash);
  return redirect("/users/login");
}
