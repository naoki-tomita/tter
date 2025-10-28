"use client";

import { useContext } from "react";
import { TweetContext, TweetProvider } from "../hooks/useTweet";
import { Tweeter } from "./Tweeter";
import { type Tweet } from "../../libs/db/tweet";
import { Avatar, Flex, Text } from "@mantine/core";
import style from "./ClientTimeline.module.css";


export const ClientTimeline = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <TweetProvider initialTweets={tweets}>
      <Tweeter />
      <TimelineInner />
    </TweetProvider>
  );
}

const TimelineInner = () => {
  const { tweets } = useContext(TweetContext);
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {tweets.map((timeline) => <Tweet key={timeline.id} tweet={timeline} />)}
    </ul>
  );
}

function format(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

const Tweet = ({ tweet }: { tweet: Tweet }) => {
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
}
