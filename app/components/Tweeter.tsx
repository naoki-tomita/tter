"use client";

import { useState } from "react";
import { Box, Button, Group, Textarea } from "@mantine/core";
import { useRouter } from "next/navigation";
import { post } from "../actions/timeline";

export const Tweeter = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePost() {
    setLoading(true);
    await post(content);
    setContent("");
    setLoading(false);
    router.refresh();
  }

  return (
    <Box>
      <Textarea placeholder="今日はなにした？" value={content} onChange={(e) => setContent(e.target.value)} size="md" />
      <Group justify="flex-end" mt="sm">
        <Button loading={loading} onClick={handlePost} disabled={!content}>
          Tweet
        </Button>
      </Group>
    </Box>
  );
};
