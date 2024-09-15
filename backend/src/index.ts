import "dotenv/config";
import Debug from "debug";
import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import { PORT } from "./utils/env.js";
import {
  zUserBase,
  zUsersRes,
  zUsersCreateReq,
  zUsersWrongRes,
} from "./schema.js";
import { validateData } from "./validation.js";
import { nanoid } from "nanoid";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./utils/openAPI.json";

const debug = Debug("myapp");
const app = express();
app.use(cors({ origin: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const initData = [
  {
    id: nanoid(),
    createdAt: new Date().getTime(),
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: dayjs("1980-01-01").format("YYYY-MM-DD"),
    email: "join_doe@example.com",
  },
  {
    id: nanoid(),
    createdAt: new Date().getTime(),
    firstName: "Sarah",
    lastName: "Smith",
    dateOfBirth: dayjs("1975-07-26").format("YYYY-MM-DD"),
    email: "sarah_smith@example.com",
  },
];
let data = [...initData];

// * Endpoints
app.get("/users", (req, res) => {
  // Remove password field
  res.json(zUsersRes.parse(data));
});

app.get("/users_wrong", (req, res) => {
  const dataNew = data.map((d) => {
    const { firstName, lastName, dateOfBirth, ...rest } = d;
    return {
      ...rest,
      firstname: firstName,
      lastname: lastName,
      dateOfBirth: dayjs(dateOfBirth).add(543, "year").format("YYYY-MM-DD"),
    };
  });
  res.send(zUsersWrongRes.parse(dataNew));
});

app.post("/users", validateData(zUsersCreateReq), async (req, res, next) => {
  setTimeout(() => {
    const { password, confirmPassword, ...rest } = req.body;
    const newData = {
      id: nanoid(),
      createdAt: new Date().getTime(),
      ...rest,
    };
    data = [newData, ...data];
    return res.send({ status: "success" });
  }, 2000);
});

app.post("/users/reset", async (req, res, next) => {
  data = [...initData];
  return res.send({ status: "success" });
});

// * Running app
app.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
