import useStore from "../utils/store";
import { useEffect } from "react";
import axios from "axios";
import { URL_DATA, URL_DATA_WRONG } from "../utils/env";
import { type User, usersSchema } from "../utils/types";

function useUsers(right: boolean) {
  const [users, setUsers, setFetchUsers, error, setError] = useStore(
    (state) => [
      state.users,
      state.setUsers,
      state.setFetchUsers,
      state.error,
      state.setError,
    ]
  );

  async function fetchUsers() {
    const URL = right ? URL_DATA : URL_DATA_WRONG;
    const res = await axios.get<User[]>(URL);
    console.log(res.data);
    const result = usersSchema.safeParse(res.data);

    if (!result.success) {
      console.log({ error: result.error.issues });
      setError(JSON.stringify(result.error.issues));
      return;
    }
    setUsers(result.data);
  }

  useEffect(() => {
    fetchUsers();
    setFetchUsers(fetchUsers);
  }, []);

  return { users, error };
}

export default useUsers;
