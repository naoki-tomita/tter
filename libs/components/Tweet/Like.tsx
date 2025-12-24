"use client";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { CiHeart } from "react-icons/ci";
import { like } from "../../actions/like";
import { useRouter } from "next/navigation";

export const Like = ({ id, count }: { id: number, count: number }) => {
  const router = useRouter();
  async function handleLike() {
    await like(id);
    router.refresh();
  }

  return (
    <Flex align="center" gap="xs">
      <ActionIcon variant="subtle" color="pink" size="sm" onClick={handleLike}>
        <CiHeart color="pink"/>
      </ActionIcon>
      <Text size="xs" c="pink" lh="1">{count}</Text>
    </Flex>
  );
};
