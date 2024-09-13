import Nav from "./components/Nav";
import FormVanilla from "./components/form1";
import useStore from "./utils/store";
import useUsers from "./hooks/useUser";
import UserList from "./components/UserList";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [setOpen] = useStore((state) => [state.setOpen]);
  const { users } = useUsers(true);
  return (
    <div className="container">
      <Nav />
      <FormVanilla />
      <button onClick={() => setOpen(true)}>Add</button>
      {users.map((user) => (
        <UserList key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;
