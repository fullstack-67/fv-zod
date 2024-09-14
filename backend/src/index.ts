import "dotenv/config";
import Debug from "debug";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import dayjs from "dayjs";
import { PORT } from "./utils/env.js";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { userSchema } from "./schema.js";
import { initialize } from "express-openapi";
import { myOpenApiSchema } from "./gen.js";
export function validateData(schema: z.ZodObject<any> | z.ZodEffects<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
const debug = Debug("myapp");
const app = express();
app.use(cors({ origin: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Endpoints
const initData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: dayjs("1980-01-01").format("YYYY-MM-DD"),
    email: "join_doe@example.com",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Smith",
    dateOfBirth: dayjs("1975-07-26").format("YYYY-MM-DD"),
    email: "sarah_smith@example.com",
  },
];
let data = [...initData];

app.get("/users", (req, res) => {
  res.json(data);
});
0;

app.post("/users", validateData(userSchema), async (req, res, next) => {
  setTimeout(() => {
    const { password, confirmPassword, ...rest } = req.body;
    const newData = { id: data.length + 1, ...rest };
    data = [newData, ...data];
    return res.send({ status: "success" });
  }, 2000);
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
  res.send(dataNew);
});

// * Running app
app.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
