import { createHash } from "node:crypto";

export function createPasswordHash(txt: string): string {
  const hash = createHash("sha256");
  const passwordHash = hash.update(txt).digest("hex");
  return passwordHash;
}
