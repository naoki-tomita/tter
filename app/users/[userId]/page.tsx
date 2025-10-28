import { getUserTweets } from "./actions/tweet";
import { getUserInfo } from "./actions/user";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  console.log(userId);
  const userIdNum = parseInt(userId, 10);
  const userInfo = await getUserInfo(userIdNum);
  const tweets = await getUserTweets(userIdNum);
  return (
    <div>
      <h2>{userId}: {userInfo.name}</h2>
      <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>{tweet.content}</li>
        ))}
      </ul>
    </div>
  );
}
