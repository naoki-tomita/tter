import { Box, Text } from "@mantine/core";
import { Tweet, TweetList } from "../../libs/components/Tweet";
import { search } from "./actions/tweet";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const tweets = await search(q);
  return (
    <>
      <Box mb="md">
        <Text>検索ワード: "{q}"</Text>
      </Box>
      <Box>
        <TweetList>
          {tweets.map((it) => (
            <Tweet key={it.id} tweet={it} />
          ))}
        </TweetList>
      </Box>
    </>
  );
}
