"use server";

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
    ck.set({
      name: "AUTH_TOKEN",
      value: user.id.toString(),
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    redirect("/");
  }
  redirect("/users/login?error");
}
