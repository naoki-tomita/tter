import { Box } from "@mantine/core";
import { getUsers, getCurrentUserId } from "./actions/user";
import { UserCard } from "../../libs/components/UserCard";
import { followees } from "./actions/following";

export default async function Page() {
  const userList = await getUsers();
  const currentUserId = await getCurrentUserId();
  const followers = await followees(currentUserId);
  return (
    <Box component="ul" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {userList.map(user => (
        <Box component="li" key={user.id} mb="md">
          <UserCard followee={user} followerId={currentUserId} following={!!followers.find(it => it.id === user.id)} />
        </Box>
      ))}
    </Box>
  );
}
