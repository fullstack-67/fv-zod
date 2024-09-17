import { nanoid } from "nanoid";
import dayjs from "dayjs";

export const initData = [
  {
    id: nanoid(),
    createdAt: new Date().getTime(),
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: dayjs("1980-01-01").format("YYYY-MM-DD"),
    email: "join_doe@example.com",
    password: "1234",
  },
  {
    id: nanoid(),
    createdAt: new Date().getTime(),
    firstName: "Sarah",
    lastName: "Smith",
    dateOfBirth: dayjs("1975-07-26").format("YYYY-MM-DD"),
    email: "sarah_smith@example.com",
    password: "1234",
  },
];
