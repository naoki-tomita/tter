import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/JWT";

const HEADER = "X-User-Id";
export async function proxy(req: NextRequest) {
  // ユーザーがつけてきたら危ないので削除
  req.headers.delete(HEADER);
  const headers = new Headers(req.headers);
  const token = req.cookies.get("AUTH_TOKEN");
  if (token?.value) {
    const user = verifyJwtToken(token.value);
    if (user) {
      headers.set(HEADER, user.userId.toString());
    }
  }
  return NextResponse.next({
    request: { headers },
  });
}
