import { FC } from "react";
import { type User } from "../utils/types";

interface Props {
  user: User;
}

const UserList: FC<Props> = ({ user }) => {
  return (
    <article>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.email}</div>
      <div>{user.dateOfBirth}</div>
    </article>
  );
};

export default UserList;
