import { Box, Button, Flex, Notification, Textarea, TextInput } from "@mantine/core";
import { getCurrentUser } from "../../actions/user";
import { updateUser } from "./actions/user";
import { Toast } from "../../../libs/components/Toast/Toast";

export default async function Page({ searchParams }: { searchParams: Promise<{ success: string }> }) {
  const user = await getCurrentUser();
  const { success } = await searchParams;
  return (
    <Box component="form" action={updateUser}>
      <TextInput
        type="text"
        name="name"
        label="名前"
        placeholder="John Doe"
        required
        defaultValue={user.name}
        size="md"
      />
      <Textarea name="bio" label="自己紹介" placeholder="あなたの自己紹介" mt="sm" defaultValue={user.bio} size="md" />
      <Flex mt="md" justify="flex-end">
        <Button type="submit">更新</Button>
      </Flex>
      {success != null && (
        <>
          <Toast title="Updated!" color="green">
            プロフィールを更新しました
          </Toast>
        </>
      )}
    </Box>
  );
}
