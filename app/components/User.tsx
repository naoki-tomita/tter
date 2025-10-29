import { Avatar, Menu, MenuTarget, MenuDropdown, MenuItem, UnstyledButton, Button } from "@mantine/core";
import { getCurrentUser } from "../actions/user";
import { logout } from "../actions/logout";
import { type User as UserType } from "../../libs/db/user";
import Link from "next/link";

export const User = async () => {
  const user = await getCurrentUser();
  return user ? <LoggedInUser user={user}/> : <NotLoggedInUser />;
}

const NotLoggedInUser = () => {
  return <Link href="/users/login"><Button>Login</Button></Link>
}

const LoggedInUser = async ({ user }: { user: UserType }) => {
  return (
    <Menu shadow="lg" width={200} position="bottom-end">
      <MenuTarget>
        <UnstyledButton>
          <Avatar
            color="initials"
            name={user.name}
            radius="xl"
          />
        </UnstyledButton>
      </MenuTarget>
      <MenuDropdown>
        <Link href="/users/me">
          <MenuItem>
            Profile
          </MenuItem>
        </Link>
        <Link href="/users">
          <MenuItem>
            ユーザー一覧
          </MenuItem>
        </Link>
        <MenuItem onClick={logout}>
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
}
