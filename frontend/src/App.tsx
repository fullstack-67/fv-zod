import useStore from "./hooks/store";
import useUsers from "./hooks/useUser";
import FormVanilla from "./components/formVanilla";
import FormRHF from "./components/formRHF";
import UserList from "./components/UserList";
import Modal from "react-modal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
Modal.setAppElement("#root");

function App() {
  useUsers();
  const [users, setOpenVN, setOpenRHF, error] = useStore((state) => [
    state.users,
    state.setOpenVN,
    state.setOpenRHF,
    state.error,
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
        {!error ? (
          users.map((user) => <UserList key={user.id} user={user} />)
        ) : (
          <article>
            <div style={{ fontStyle: "italic" }}>
              We’re currently experiencing a technical issue with our system.
              Our team is working swiftly to resolve it and restore full
              functionality. <br />
              <br />
              We apologize for any inconvenience this may cause and appreciate
              your patience. Thank you for your understanding. We’ll provide an
              update as soon as the issue is resolved. If you have any urgent
              concerns, please contact our support team at{" "}
              <a href="mailto: name@email.com">we-do-not-care@example.com</a>.
              <br />
              <br />
              Best regards,
              <br /> Example Company
            </div>
          </article>
        )}
      </div>
      {/* Forms */}
      <FormVanilla />
      <FormRHF />
    </div>
  );
}

export default App;
