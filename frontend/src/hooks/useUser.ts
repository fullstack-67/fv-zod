import useStore from "./store";
import { useEffect } from "react";
import axios from "axios";
import { URL_DATA, refetchInterval } from "../utils/env";
import { type User } from "../utils/schema";
import { useQuery } from "@tanstack/react-query";

function useUsers() {
  const [setUsers, setFetchUsers, setError] = useStore((state) => [
    state.setUsers,
    state.setFetchUsers,
    state.setError,
  ]);

  async function fetchUsers() {
    const res = await axios.get<User[]>(URL_DATA);
    //
    console.log({ data: res.data });
    //
    const usersSorted = res.data.sort((a, b) => b.createdAt - a.createdAt);
    setUsers(usersSorted);
    return null; // I don't need react query to return data.
  }

  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchInterval: refetchInterval,
  });

  useEffect(() => {
    setFetchUsers(query.refetch);
  }, []);
}

export default useUsers;
