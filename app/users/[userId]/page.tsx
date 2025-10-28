import { Tweet, TweetList } from "../../../libs/components/Tweet";
import { getUserTweets } from "./actions/tweet";
import { getUserInfo } from "./actions/user";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const userIdNum = parseInt(userId, 10);
  const userInfo = await getUserInfo(userIdNum);
  const tweets = await getUserTweets(userIdNum);
  return (
    <div>
      <h2>{userId}: {userInfo.name}</h2>
      <TweetList>
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </TweetList>
    </div>
  );
}
