"use server";

import { createHash } from "node:crypto";
import { db } from "../../../../util/Database";
import { TODO } from "../../../../util/todo";
import { redirect } from "next/navigation";

export async function createUser(form: FormData) {
  const name = form.get("name")?.toString() ?? TODO();
  const email = form.get("email")?.toString() ?? TODO();
  const password = form.get("password")?.toString() ?? TODO();
  const hash = createHash("sha256");
  const passwordHash = hash.update(password).digest("hex");

  await db.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, passwordHash]);
  return redirect("/users/login");
}
