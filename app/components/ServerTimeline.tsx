import { getTimelines } from "../actions/timeline";
import { TweetProvider } from "../hooks/useTweet";
import { ClientTimeline } from "./ClientTimeline";
import { Tweeter } from "./Tweeter";

export const ServerTimeline = async () => {
  const tweets = await getTimelines();
  return (
      <ClientTimeline tweets={tweets} />
  );
}
