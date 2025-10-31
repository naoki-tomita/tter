import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const headers = new Headers(req.headers);
  const token = req.cookies.get("AUTH_TOKEN");
  if (token?.value) {
    headers.set("X-User-Id", token.value);
  }
  return NextResponse.next({
    request: { headers },
  });
}
