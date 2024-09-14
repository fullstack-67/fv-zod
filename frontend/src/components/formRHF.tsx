import Modal, { Styles } from "react-modal";
import useStore from "../hooks/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { formSchema, type Form } from "../utils/types";
import { URL_DATA } from "../utils/env";
import { getInitData } from "../utils/helper";
import dayjs from "dayjs";

const modalStyles: Styles = {
  overlay: {
    backdropFilter: "blur(2px)",
  },
  content: {
    background: "#033452",
    overflowY: "auto",
    width: "80%",
    height: "fit-content",
    transform: "translate(10%, 10%)",
    borderRadius: "0.75rem",
    borderColor: "#48536B",
    padding: "2rem",
  },
};

const FormRHF = () => {
  const [open, setOpen, fetchUsers] = useStore((state) => [
    state.openRHF,
    state.setOpenRHF,
    state.fetchUsers,
  ]);

  const rhf = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitData(false),
    mode: "onTouched", // Try onSubmit
  });
  const { register, handleSubmit, watch, reset, setValue, formState } = rhf;
  const { errors, isSubmitting, isValid } = formState;
  // const values = watch();

  async function sendData(data: Form) {
    const dataMod = {
      ...data,
      dateOfBirth: dayjs(data.dateOfBirth).format("YYYY-MM-DD"),
    };
    try {
      await axios.post(URL_DATA, dataMod);
      setOpen(false);
      fetchUsers();
      reset(getInitData(false));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="form">
      <Modal isOpen={open} style={modalStyles}>
        <form
          onSubmit={handleSubmit(sendData)}
          className="flex flex-col gap-2 items-start"
        >
          <h1>Form (React Hook Form)</h1>
          <div className="grid">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="firstName" />
              {/* {errors.firstName?.message && errors.firstName?.message} */}
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="lastName" />
            </div>
          </div>

          <div className="grid">
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="text"
                id="email"
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="email" />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                {...register("dateOfBirth")}
                type="text"
                id="dateOfBirth"
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="dateOfBirth" />
            </div>
          </div>
          <div className="grid">
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="password" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                disabled={isSubmitting}
              />
              <ErrorMessage errors={errors} name="confirmPassword" />
            </div>
          </div>

          <div className="grid" style={{ alignItems: "start" }}>
            <button type="submit" disabled={isSubmitting || !isValid}>
              {formState.isSubmitting ? "Working" : "Submit"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                reset(getInitData(false));
              }}
              disabled={isSubmitting}
              className="secondary"
            >
              Close
            </button>
          </div>
        </form>

        {/* <div>{JSON.stringify(values, null, 2)}</div>
        <div>{JSON.stringify(getErrMsg(errors))}</div> */}
      </Modal>
    </div>
  );
};

export default FormRHF;
