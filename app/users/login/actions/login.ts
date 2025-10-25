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

  const result = await db.execute("SELECT * FROM users WHERE email = ? AND password_hash = ?", [email, passwordHash]);
  if (result.rows.length > 0) {
    const ck = await cookies();
    ck.set("AUTH_TOKEN", result.rows[0].id.toString());
    redirect("/");
  }
  throw new Error("Invalid credentials");
}
