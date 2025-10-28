type User = {
  id: number;
  name: string;
}

export type Tweet = {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}
