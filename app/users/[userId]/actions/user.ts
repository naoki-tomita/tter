import { users } from "../../../../libs/db/user";

type User = {
  id: number;
  name: string;
}

export async function getUserInfo(userId: number): Promise<User> {
  return users.findById(userId);
}
