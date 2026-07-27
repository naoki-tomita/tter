import { Anchor, Avatar, Box, Flex, Text } from "@mantine/core";
import { type Tweet as TweetType } from "../../db/tweet";
import style from "./index.module.css";
import Link from "next/link";
import { Datetime } from "./Datetime";
import { Like } from "./Like";

export const TweetList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box component="ul" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {children}
    </Box>
  );
};

const TextWithLink = ({ text }: { text: string }) => {
  return (
    <span>
      {text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
        if (part.match(/https?:\/\/[^\s]+/)) {
          return (
            <Link key={index} href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </Link>
          );
        }
        return part;
      })}
    </span>
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
            <TextWithLink text={it} />
          </Text>
        ))}
        <Flex justify="space-between" gap="sm" align="center">
          <Like id={tweet.id} count={tweet.likeCount} />
          <Text size="xs" c="gray" lh="1">
            <Datetime date={new Date(tweet.createdTime)} />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
