"use client";

import { Group, Avatar, Text, Flex, Button } from "@mantine/core";
import { type User } from "../../../../libs/db/user";
import classes from "./UserCard.module.css";
import { follow, unfollow } from "../actions/following";
import { redirect } from "next/navigation";

export const UserCard = ({ followee, followerId, following }: { followee: User, followerId: number, following: boolean }) => {
  const followable = followee.id !== followerId;

  async function handleFollowClick() {
    await (following ? unfollow : follow)(followerId, followee.id);
    redirect(`/users/${followee.id}`);
  }

  return (
      <Flex justify="space-between" align="center">
        <Group wrap="nowrap">
          <Avatar
            name={followee.name}
            size={94}
            color="initials"
            radius="md"
          />
          <div>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              @{followee.id}
            </Text>

            <Text fz="lg" fw={500} className={classes.name}>
              {followee.name}
            </Text>

            <Text fz="sm" c="dimmed">
              {followee.bio}
            </Text>
          </div>
        </Group>
        {followable &&
          <Button
            size="compact-md"
            variant={following ? "outline" : "filled"}
            onClick={handleFollowClick}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>}
      </Flex>
  );
}
