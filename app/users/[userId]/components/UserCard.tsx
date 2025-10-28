import { Group, Avatar, Text } from "@mantine/core";
import { User } from "../../../../libs/db/user";
import classes from "./UserCard.module.css";

export const UserCard = ({ user }: { user: User }) => {
  return (
      <Group wrap="nowrap">
        <Avatar
          name={user.name}
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            @{user.id}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {user.name}
          </Text>
        </div>
      </Group>

  );
}
