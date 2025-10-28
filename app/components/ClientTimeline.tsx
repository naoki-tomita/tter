"use client";

import { useContext } from "react";
import { TweetContext, TweetProvider } from "../hooks/useTweet";
import { Tweeter } from "./Tweeter";
import { type Tweet as TweetType } from "../../libs/db/tweet";
import { Tweet, TweetList } from "../../libs/components/Tweet";

export const ClientTimeline = ({ tweets }: { tweets: TweetType[] }) => {
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
    <TweetList>
      {tweets.map((timeline) => <Tweet key={timeline.id} tweet={timeline} />)}
    </TweetList>
  );
}
