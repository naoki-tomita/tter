import { Box, Group } from "@mantine/core";
import { Tweet, TweetList } from "../../../libs/components/Tweet";
import { getUserTweets } from "./actions/tweet";
import { getUserInfo } from "./actions/user";
import { UserCard } from "./components/UserCard";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const userIdNum = parseInt(userId, 10);
  const userInfo = await getUserInfo(userIdNum);
  const tweets = await getUserTweets(userIdNum);
  return (
    <Box>
      <UserCard user={userInfo} />
      <Box mt="xl">
        <TweetList>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </TweetList>
      </Box>
    </Box>
  );
}
