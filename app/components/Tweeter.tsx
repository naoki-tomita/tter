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
    <Box mb="md">
      <Textarea
        placeholder="今日はなにした？"
        value={content}
        onChange={e => setContent(e.target.value)}
        mb="sm"
      />
      <Group justify="flex-end">
        <Button onClick={handlePost}>Tweet</Button>
      </Group>
    </Box>
  );
}
