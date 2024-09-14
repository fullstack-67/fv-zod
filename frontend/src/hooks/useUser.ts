import useStore from "./store";
import { useEffect } from "react";
import axios from "axios";
import { URL_DATA, URL_DATA_WRONG } from "../utils/env";
import { type User, usersSchema } from "../utils/types";
import { useQuery } from "@tanstack/react-query";

function useUsers(right: boolean) {
  const [setUsers, setFetchUsers, setError] = useStore((state) => [
    state.setUsers,
    state.setFetchUsers,
    state.setError,
  ]);

  async function fetchUsers() {
    const URL = right ? URL_DATA : URL_DATA_WRONG;
    const res = await axios.get<User[]>(URL);
    const result = usersSchema.safeParse(res.data);

    if (!result.success) {
      console.log({ error: result.error.issues });
      const errorMsg = JSON.stringify(result.error.issues);
      setError(errorMsg);
      return Promise.reject(errorMsg);
    }

    const usersSorted = result.data.sort((a, b) => b.createdAt - a.createdAt);
    setUsers(usersSorted);
    return null; // I don't need react query to return data.
  }

  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchInterval: 1000,
  });

  useEffect(() => {
    setFetchUsers(query.refetch);
  }, []);
}

export default useUsers;
