import { FC } from "react";
import { type User } from "../utils/schema";
import styles from "../styles/style.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  user: User;
}

const UserList: FC<Props> = ({ user }) => {
  return (
    <article className={styles.userInfoWrapper}>
      <div className={styles.userInfo}>
        <i className="fa-solid fa-lg fa-user"></i>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div className={styles.userInfo}>
        <i className="fa-solid fa-lg fa-envelope"></i>
        <span>{user.email}</span>
      </div>
      <div className={styles.userInfo}>
        <i className="fa-solid fa-lg fa-cake-candles"></i>
        <span>{user.dateOfBirth}</span>
      </div>
      <div className={styles.userInfo}>
        <i className="fa-solid fa-lg fa-plus"></i>
        <span>{dayjs(user.createdAt).fromNow()}</span>
      </div>
    </article>
  );
};

export default UserList;
