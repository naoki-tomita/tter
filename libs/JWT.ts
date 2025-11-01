import { createHmac } from "node:crypto";

function encodeBase64(txt: string): string {
  return Buffer.from(txt).toString("base64url");
}

const secret = process.env.JWT_SECRET;
export function createJwtToken(userId: number) {
  const header = encodeBase64(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = encodeBase64(JSON.stringify({ userId }));
  const input = `${header}.${payload}`;

  const signature = createHmac("sha256", secret ?? "DEFAULT_SECRET")
    .update(input)
    .digest("base64url");
  return `${input}.${signature}`;
}

export function verifyJwtToken(token: string): { userId: number } | null {
  const [header, payload, signature] = token.split(".");
  const input = `${header}.${payload}`;
  const expectedSignature = createHmac("sha256", secret)
    .update(input)
    .digest("base64url");
  if (signature !== expectedSignature) {
    return null;
  }
  return JSON.parse(Buffer.from(payload, "base64url").toString());
}
