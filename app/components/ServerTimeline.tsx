import { getTimelines } from "../actions/timeline";
import { ClientTimeline } from "./ClientTimeline";

export const ServerTimeline = async () => {
  const tweets = await getTimelines();
  return <ClientTimeline tweets={tweets} />;
};
