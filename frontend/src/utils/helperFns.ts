import { faker } from "@faker-js/faker";
import { enableInitialFakeData } from "./env";
import dayjs from "dayjs";

export function getInitData() {
  if (!enableInitialFakeData) {
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

  // const day = dob.getDate();
  // const month = dob.getMonth();
  // const year = dob.getFullYear();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    // dateOfBirth: `${year}-${month}-${day}`,
    dateOfBirth: dayjs(dob).format("YYYY-MM-DD"),
    password: passwd,
    confirmPassword: passwd,
  };
}
