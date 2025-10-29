import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { createUser } from "./actions/createUser";
import classes from "./page.module.css";

export default function CreatePage() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Hello world!
      </Title>

      <Paper component="form" withBorder shadow="sm" p={22} mt={30} radius="md" action={createUser}>
        <TextInput name="name" label="名前" placeholder="あなたの名前" required radius="md" />
        <TextInput name="email" label="メールアドレス" placeholder="you@tter.dev" required mt="xs"  radius="md" />
        <PasswordInput name="password" label="パスワード" required mt="xs" radius="md" />
        <PasswordInput name="password2" label="パスワード確認" required mt="xs" radius="md" />
        <Button type="submit" fullWidth mt="lg" radius="md">
          アカウント作成
        </Button>
      </Paper>
    </Container>
  );
}
