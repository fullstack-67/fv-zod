import { FieldErrors } from "react-hook-form";
import { type Form } from "./types";
import { faker } from "@faker-js/faker";

export function getErrMsg(errors: FieldErrors<Form>) {
  const err: {
    [key: string]: string;
  } = {
    firstName: errors.firstName?.message || "",
    lastName: errors.lastName?.message || "",
    email: errors.email?.message || "",
    dateOfBirth: errors.dateOfBirth?.message || "",
    password: errors.password?.message || "",
    confirmPassword: errors.confirmPassword?.message || "",
  };

  Object.keys(err).forEach((key) => {
    if (err[key] === "") {
      delete err[key];
    }
  });

  return err;
}

export function getInitData(blank = false): Form {
  if (blank) {
    return {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    };
  }
  const passwd = faker.internet.password();
  const dob = faker.date.past();
  const day = dob.getDate();
  const month = dob.getMonth();
  const year = dob.getFullYear();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    dateOfBirth: `${year}-${month}-${day}`,
    password: passwd,
    confirmPassword: passwd,
  };
}
