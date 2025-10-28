import { Avatar, Menu, MenuTarget, MenuDropdown, MenuItem, UnstyledButton } from "@mantine/core";
import { getCurrentUser } from "../actions/user";
import { logout } from "../actions/logout";
import { type User as UserType } from "../../libs/db/user";

export const User = async () => {
  const user = await getCurrentUser();
  return user ? <LoggedInUser user={user}/> : <NotLoggedInUser />;
}

const NotLoggedInUser = () => {
  return <div><a href="/users/login">No User ID</a></div>;
}

const LoggedInUser = async ({ user }: { user: UserType }) => {
  return (
    <Menu shadow="lg" width={200} position="bottom-end">
      <MenuTarget>
        <UnstyledButton>
          <Avatar
            color="initials"
            radius="xl"
          >
            {user.name.slice(0, 2).toUpperCase()}
          </Avatar>
        </UnstyledButton>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem component="a" href={`/users/${user.id}`}>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
