import { Anchor, Avatar, Box, Flex, Text } from "@mantine/core";
import { type Tweet as TweetType } from "../../libs/db/tweet";
import style from "./Tweet.module.css";
import Link from "next/link";

function format(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export const TweetList = ({ children }: { children: React.ReactNode }) => {
  return <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{children}</ul>;
}

export const Tweet = ({ tweet }: { tweet: TweetType }) => {
  return (
    <Flex className={style.tweet} component="li" p="md" gap="md" align="center">
      <Avatar color="initials" name={tweet.user.name}/>
      <Flex direction="column" w="100%">
        <Box>
          <Link href={`/users/${tweet.user.id}`}>
            <Anchor component="span" size="xs" fw="bold">
              {tweet.user.name}
            </Anchor>
          </Link>
        </Box>
        <Text size="md">{tweet.content}</Text>
        <Flex justify="flex-end">
          <Text size="xs" c="gray">{format(tweet.createdAt)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
