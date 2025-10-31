import { Tweeter } from "./Tweeter";
import { type Tweet as TweetType } from "../../libs/db/tweet";
import { Tweet, TweetList } from "../../libs/components/Tweet";
import { Box } from "@mantine/core";

export const ClientTimeline = ({ tweets }: { tweets: TweetType[] }) => {
  return (
    <>
      <Tweeter />
      <Box mt="lg" mb="lg">
        <TimelineInner tweets={tweets} />
      </Box>
    </>
  );
};

const TimelineInner = ({ tweets }: { tweets: TweetType[] }) => {
  return (
    <TweetList>
      {tweets.map((timeline) => (
        <Tweet key={timeline.id} tweet={timeline} />
      ))}
    </TweetList>
  );
};
