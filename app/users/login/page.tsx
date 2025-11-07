import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import classes from "./page.module.css";
import { login } from "./actions/login";
import Link from "next/link";
import { Notice } from "./components/Notice";
import { getCurrentUserId } from "../../../libs/actions/user";
import { useRouter } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const { error } = await searchParams;
  const router = useRouter();
  const userId = await getCurrentUserId();
  if (userId != null) {
    return router.replace("/");
  }

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>

        <Text className={classes.subtitle}>
          アカウントをお持ちでない場合 -{" "}
          <Link href="/users/new">
            <Anchor component="span" size="sm">
              アカウントを作成
            </Anchor>
          </Link>
        </Text>

        <Paper component="form" withBorder shadow="sm" p={22} mt={30} radius="md" action={login}>
          <TextInput name="email" label="メールアドレス" placeholder="you@tter.dev" required radius="md" size="md" />
          <PasswordInput
            name="password"
            label="パスワード"
            placeholder="Password"
            required
            mt="md"
            radius="md"
            size="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              パスワードをお忘れですか？
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </Paper>
      </Container>
      {error != null && <Notice text="メールアドレスまたはパスワードが正しくありません。" />}
    </>
  );
}
