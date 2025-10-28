"use client";

import { useContext, useState } from "react";
import { TweetContext } from "../hooks/useTweet";
import { Box, Button, Group, Textarea } from "@mantine/core";

export const Tweeter = () => {
  const { post } = useContext(TweetContext);
  const [content, setContent] = useState("");

  async function handlePost() {
    await post(content);
    setContent("");
  }

  return (
    <Box>
      <Textarea
        placeholder="今日はなにした？"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Group justify="flex-end" mt="sm">
        <Button onClick={handlePost} disabled={!content}>Tweet</Button>
      </Group>
    </Box>
  );
}
