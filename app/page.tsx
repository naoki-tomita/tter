import { redirect } from "next/navigation";
import { getCurrentUser } from "./actions/user";
import { ServerTimeline } from "./components/ServerTimeline";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/users/login");
  return <ServerTimeline />;
}
