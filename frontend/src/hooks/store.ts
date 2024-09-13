import { create } from "zustand";
import { type User } from "../utils/types";
interface Store {
  open: boolean;
  setOpen: (open: boolean) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  fetchUsers: () => void;
  setFetchUsers: (fetchUsers: () => void) => void;
  error: string;
  setError: (error: string) => void;
}

const useStore = create<Store>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  users: [],
  setUsers: (users) => set({ users }),
  fetchUsers: () => {},
  setFetchUsers: (fetchUsers) => set({ fetchUsers }),
  error: "",
  setError: (error) => set({ error }),
}));

export default useStore;
