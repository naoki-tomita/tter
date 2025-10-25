"use server";

import { redirect } from "next/navigation";
import { db } from "../../../../util/Database";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export async function login(form: FormData) {
  const email = form.get("email")?.toString() ?? "";
  const password = form.get("password")?.toString() ?? "";
  const hash = createHash("sha256");
  const passwordHash = hash.update(password).digest("hex");

  const row = db.prepare<string[], { id: number }>("SELECT * FROM users WHERE email = ? AND password_hash = ?").get(email, passwordHash);
  if (row) {
    const ck = await cookies();
    ck.set("AUTH_TOKEN", row.id.toString());
    redirect("/");
  }
  throw new Error("Invalid credentials");
}
