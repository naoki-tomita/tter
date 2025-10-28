import { Box, Button, Flex, Textarea, TextInput } from "@mantine/core";
import { getCurrentUser } from "../../actions/user";
import { updateUser } from "./actions/user";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <Box component="form" action={updateUser}>
      <TextInput type="text" name="name" label="名前" placeholder="John Doe" required defaultValue={user.name} />
      <Textarea name="bio" label="自己紹介" placeholder="あなたの自己紹介" mt="sm" defaultValue={user.bio} />
      <Flex mt="md" justify="flex-end">
        <Button type="submit">更新</Button>
      </Flex>
    </Box>
  );
}
