"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { users } from "../../../../libs/db/user";
import { createPasswordHash } from "../../../../libs/password";

export async function login(form: FormData) {
  const email = form.get("email")?.toString() ?? "";
  const password = form.get("password")?.toString() ?? "";
  const passwordHash = createPasswordHash(password);

  const user = await users.findByEmailAndPasswordHash(email, passwordHash);
  if (user) {
    const ck = await cookies();
    ck.set("AUTH_TOKEN", user.id.toString());
    redirect("/");
  }
  throw new Error("Invalid credentials");
}
