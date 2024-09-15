import { FC } from "react";
import { type User } from "../utils/schema";

interface Props {
  user: User;
}

const UserList: FC<Props> = ({ user }) => {
  return (
    <article className="grid">
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>{user.email}</div>
      <div>{user.dateOfBirth}</div>
    </article>
  );
};

export default UserList;
