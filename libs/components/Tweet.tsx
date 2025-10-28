import { Avatar, Flex, Text } from "@mantine/core";
import { type Tweet as TweetType } from "../../libs/db/tweet";
import style from "./Tweet.module.css";

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
      <Avatar>{tweet.user.name.slice(0, 2).toUpperCase()}</Avatar>
      <Flex direction="column" w="100%">
        <Text size="xs">{tweet.user.name}</Text>
        <Text size="md">{tweet.content}</Text>
        <Flex justify="flex-end">
          <Text size="xs" c="gray">{format(tweet.createdAt)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
