import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/JWT";

const HEADER = "X-User-Id";
export async function proxy(req: NextRequest) {
  console.log("proxy in")
  // ユーザーがつけてきたら危ないので削除
  req.headers.delete(HEADER);
  const headers = new Headers(req.headers);
  console.log("headers", headers);
  const token = req.cookies.get("AUTH_TOKEN");
  console.log("token", token);
  if (token?.value) {
    console.log("token value", token.value);
    const user = verifyJwtToken(token.value);
    console.log("user", user);
    if (user) {
      console.log("user id", user.userId);
      headers.set(HEADER, user.userId.toString());
    }
  }
  console.log("proxy out")
  return NextResponse.next({
    request: { headers },
  });
}
