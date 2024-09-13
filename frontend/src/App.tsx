import Nav from "./components/Nav";
import FormVanilla from "./components/form1";
import FormRHF from "./components/form2";
import useStore from "./hooks/store";
import useUsers from "./hooks/useUser";
import UserList from "./components/UserList";
import Modal from "react-modal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
Modal.setAppElement("#root");

function App() {
  useUsers(true);
  const [setOpen, users] = useStore((state) => [state.setOpen, state.users]);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  console.log(users);
  return (
    <div className="container">
      <Nav />
      <div>
        <button onClick={() => setOpen(true)}>Add</button>
        <div ref={parent}>
          {users.map((user) => (
            <UserList key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* <FormVanilla /> */}
      <FormRHF />
    </div>
  );
}

export default App;
