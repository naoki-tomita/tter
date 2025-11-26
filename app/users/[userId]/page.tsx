import { Box } from "@mantine/core";
import { Tweet, TweetList } from "../../../libs/components/Tweet";
import { getUserTweets } from "./actions/tweet";
import { getUserInfo } from "./actions/user";
import { UserCard } from "../../../libs/components/UserCard";
import { isFollowing } from "./actions/following";
import { getCurrentUserId } from "../../../libs/actions/user";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const userIdNum = parseInt(userId, 10);
  const currentUserId = await getCurrentUserId();
  const userInfo = await getUserInfo(userIdNum);
  const tweets = await getUserTweets(userIdNum);
  const following = await isFollowing(currentUserId, userIdNum);

  return (
    <Box>
      <UserCard followee={userInfo} followerId={currentUserId} following={following} />
      <Box mt="xl">
        <TweetList>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </TweetList>
      </Box>
    </Box>
  );
}
