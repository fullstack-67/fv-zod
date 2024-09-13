import { FC, useState, useEffect, ChangeEvent } from "react";
import Modal, { Styles } from "react-modal";
import useStore from "../utils/store";
import axios from "axios";
import { formSchema, type Form } from "../utils/types";
import { URL_DATA } from "../utils/env";
import { getInitData } from "../utils/helper";

const FormVanilla: FC = () => {
  const [open, setOpen, fetchUsers] = useStore((state) => [
    state.open,
    state.setOpen,
    state.fetchUsers,
  ]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.id === "firstName" && setFirstName(e.target.value);
    e.target.id === "lastName" && setLastName(e.target.value);
    e.target.id === "email" && setEmail(e.target.value);
    e.target.id === "dateOfBirth" && setDateOfBirth(e.target.value);
    e.target.id === "password" && setPassword(e.target.value);
    e.target.id === "confirmPassword" && setConfirmPassword(e.target.value);
  }

  useEffect(() => {
    console.log("open", open);
    const initData = getInitData(false);
    setFirstName(initData.firstName);
    setLastName(initData.lastName);
    setEmail(initData.email);
    setDateOfBirth(initData.dateOfBirth);
    setPassword(initData.password);
    setConfirmPassword(initData.confirmPassword);
  }, [open]);

  function reset() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDateOfBirth("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  }
  // For inspection
  const values = {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    confirmPassword,
  };

  async function sendData(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      console.log(result);
      setError(JSON.stringify(result.error.issues));
      return;
    }
    try {
      const res = await axios.post(URL_DATA, values);
      setOpen(false);
      fetchUsers();
      reset();
    } catch (err: any) {
      console.log(err);
      setError(err?.message || "Error sending data");
    }
  }
  const customStyles: Styles = {
    overlay: {
      backdropFilter: "blur(2px)",
    },
    content: {
      background: "#181C25",
      overflowY: "auto",
      width: "80%",
      height: "80%",
      transform: "translate(10%, 10%)",
      borderRadius: "0.75rem",
      borderColor: "#48536B",
      padding: "2rem",
    },
  };
  return (
    <div id="form">
      <Modal isOpen={open} style={customStyles}>
        <form onSubmit={sendData}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={onChange} />
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="text"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>

          {/* {JSON.stringify(values)} */}

          <div className="text-red-500">{error}</div>

          <button type="submit">Submit</button>
          <button
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default FormVanilla;
