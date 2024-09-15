import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { zUsersRes, zUsersWrongRes, zUsersCreateReq } from "@src/schema.js";

extendZodWithOpenApi(z);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const registry = new OpenAPIRegistry();

const UsersResSchema = zUsersRes.openapi("Users");
const UsersWrongResSchema = zUsersWrongRes.openapi("UsersWrong");
const UserCreateReqSchema = zUsersCreateReq.openapi("UserCreate");

registry.registerPath({
  method: "get",
  path: "/users",
  description: "Get all users",
  summary: "Get all users",
  responses: {
    200: {
      description: "User data array",
      content: {
        "application/json": {
          schema: UsersResSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/users_wrong",
  description: "Get all users",
  summary: "Get all users",
  responses: {
    200: {
      description: "User data array",
      content: {
        "application/json": {
          schema: UsersWrongResSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/users",
  description: "Create user",
  summary: "Create user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserCreateReqSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Reset sucessfully",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string().openapi({
              example: "success",
            }),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/users/reset",
  description: "Reset users to initial data",
  summary: "Reset users to initial data",
  responses: {
    200: {
      description: "Reset sucessfully",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string().openapi({
              example: "success",
            }),
          }),
        },
      },
    },
  },
});

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API.",
    },
    servers: [{ url: "/" }],
  });
}

function writeDocumentation() {
  // OpenAPI JSON
  const docs = getOpenApiDocumentation();

  //  JSON
  const fileContent = JSON.stringify(docs, null, 4);

  fs.writeFileSync(`${__dirname}/openAPI.json`, fileContent, {
    encoding: "utf-8",
  });
}

writeDocumentation();
