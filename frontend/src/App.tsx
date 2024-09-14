import useStore from "./hooks/store";
import useUsers from "./hooks/useUser";
import FormVanilla from "./components/formVanilla";
import FormRHF from "./components/formRHF";
import UserList from "./components/UserList";
import Modal from "react-modal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
Modal.setAppElement("#root");

function App() {
  useUsers(true);
  const [users, setOpenVN, setOpenRHF] = useStore((state) => [
    state.users,
    state.setOpenVN,
    state.setOpenRHF,
  ]);
  const [parent] = useAutoAnimate(/* optional config */);
  return (
    <div className="container">
      {/* Navigation Bar */}
      <header style={{ padding: "1rem 0" }}>
        <nav>
          <ul>
            <li>
              <a href="/" className="custom-icon">
                <i className="fa-solid fa-xl fa-home"></i>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={() => setOpenVN(true)}>Form Vanilla</button>
            </li>
            <li>
              <button onClick={() => setOpenRHF(true)}>Form RHF</button>
            </li>
          </ul>
        </nav>
      </header>
      {/* Users */}
      <div ref={parent}>
        {users.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
      {/* Forms */}
      <FormVanilla />
      <FormRHF />
    </div>
  );
}

export default App;
