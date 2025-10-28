import { createContext, useState } from "react";
import { getTimelines, post } from "../actions/timeline";
import { Tweet } from "../../libs/db/tweet";


export const TweetContext = createContext<{
  tweets: Tweet[];
  post: (content: string) => Promise<void>;
  refresh: () => Promise<void>;
}>({
  tweets: [],
  post: async () => {},
  refresh: async () => {},
});

export function useTweet(initialTweets: Tweet[]) {
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets);

  async function refresh() {
    const tweets = await getTimelines();
    setTweets(tweets);
  }

  return {
    tweets,
    async post(content: string) {
      await post(content);
      await refresh();
    },
    refresh,
  };
}

export const TweetProvider = ({ children, initialTweets }: { children: React.ReactNode; initialTweets: Tweet[] }) => {
  const tweet = useTweet(initialTweets);
  return (
    <TweetContext.Provider value={tweet}>
      {children}
    </TweetContext.Provider>
  );
};
