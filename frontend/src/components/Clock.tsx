import { FC, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/style.module.css";

interface Props {
  withRefetch?: Boolean;
}
const Clock: FC<Props> = ({ withRefetch }) => {
  const [clock, setClock] = useState("");
  const refetch = () => {
    axios
      .request<{ data: string }>({
        method: "GET",
        url: "/clock",
      })
      .then((res) => setClock(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    refetch();
  }, []);

  if (!withRefetch) {
    return <kbd>{clock}</kbd>;
  } else {
    return (
      <article>
        <div className={styles.clockWrapper}>
          <span className={styles.clockText}>{clock}</span>
          <button onClick={() => refetch()}>Refetch</button>
        </div>
      </article>
    );
  }
};

export default Clock;
