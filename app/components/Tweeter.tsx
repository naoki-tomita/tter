"use client";

import { useState } from "react";
import { Box, Button, Group, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { post } from "../actions/timeline";

export const Tweeter = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  async function handlePost() {
    await post(content);
    setContent("");
    router.refresh();
  }

  return (
    <Box>
      <Textarea
        placeholder="今日はなにした？"
        value={content}
        onChange={e => setContent(e.target.value)}
        size="md"
      />
      <Group justify="flex-end" mt="sm">
        <Button onClick={handlePost} disabled={!content}>Tweet</Button>
      </Group>
    </Box>
  );
}
