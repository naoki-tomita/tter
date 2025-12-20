import { Anchor, Avatar, Box, Flex, Text } from "@mantine/core";
import { type Tweet as TweetType } from "../../db/tweet";
import style from "./index.module.css";
import Link from "next/link";
import { Datetime } from "./Datetime";

function format(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export const TweetList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box component="ul" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {children}
    </Box>
  );
};

export const Tweet = ({ tweet }: { tweet: TweetType }) => {
  return (
    <Flex className={style.tweet} component="li" p="md" gap="md" align="center">
      <Avatar color="initials" name={tweet.user.name} />
      <Flex direction="column" w="100%">
        <Box>
          <Link href={`/users/${tweet.user.id}`}>
            <Anchor component="span" size="xs" fw="bold">
              {tweet.user.name}
            </Anchor>
          </Link>
        </Box>
        {tweet.content.split("\n").map((it, i) => (
          <Text size="md" key={i}>
            {it}
          </Text>
        ))}
        <Flex justify="flex-end">
          <Text size="xs" c="gray">
            <Datetime date={new Date(tweet.createdTime)} />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
