import { db } from "../../../../util/Database";

type User = {
  id: number;
  name: string;
}

export async function getUserInfo(userId: number): Promise<User> {
  const { rows: [user] } = await db.execute("SELECT * FROM users WHERE id = ?", [userId]);
  return {
    id: user.id as number,
    name: user.name as string,
  };
}
