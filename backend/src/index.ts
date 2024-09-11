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

const apiDoc = {
  swagger: "2.0",
  basePath: "/v1",
  info: {
    title: "A getting started API.",
    version: "1.0.0",
  },
  definitions: {
    World: {
      type: "object",
      properties: {
        name: {
          description: "The name of this world.",
          type: "string",
        },
      },
      required: ["name"],
    },
  },
  paths: {},
};

initialize({
  app,
  // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
  // apiDoc: './api-v1/api-doc.yml',
  apiDoc: apiDoc,
  paths: "./api-v1/paths",
});

// * Endpoints

app.post("/user", validateData(userSchema), async (req, res, next) => {
  // const dtStr = dayjs().format("DD/MM/YYYY HH:mm:ss");
  const dtStr = dayjs().format("HH:mm:ss");
  res.json({ data: dtStr });
});

// * Running app
app.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
