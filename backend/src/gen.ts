import { generateSchema } from "@anatine/zod-openapi";

import { userSchema } from "./schema.js";

export const myOpenApiSchema = generateSchema(userSchema);

console.log(myOpenApiSchema);
