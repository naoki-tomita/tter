"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const ck = await cookies();
  ck.delete("AUTH_TOKEN");
  redirect("/users/login");
}
