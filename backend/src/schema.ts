import { z } from "zod";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

const yearUpper = dayjs().year();
const yearLower = yearUpper - 100;

export const zUserBase = z.object({
  id: z
    .string()
    .min(1, { message: "Missing ID" })
    .openapi({ example: nanoid() }),
  createdAt: z.number().openapi({ example: new Date().getTime() }),
  firstName: z
    .string()
    .min(1, { message: "Missing firstname" })
    .openapi({ example: "Tom" }),
  lastName: z
    .string()
    .min(1, { message: "Missing lastname" })
    .openapi({ example: "Hardy" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .openapi({ example: "example@gmail.com" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Missing date of birth" })
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
      message: "Use format YYYY-MM-DD.",
    })
    .refine(
      (s) => {
        const year = dayjs(s).year();
        if (year < yearLower || year > yearUpper) {
          return false; // Trigger error
        } else {
          return true;
        }
      },
      {
        message: `Year not between ${yearLower} to ${yearUpper}`,
      }
    )
    .openapi({ example: "2024-01-01" }),
  password: z
    .string()
    .min(4, { message: "Password too short" })
    .openapi({ example: "123456" }),
});

// Get user
export const zUsersRes = z.array(zUserBase.omit({ password: true }));

// Create user
export const zUsersCreateReq = zUserBase
  .omit({ id: true, createdAt: true })
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password" })
      .openapi({ example: "123456" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const zUsersCreateRes = z.object({
  status: z.string().openapi({
    example: "success",
  }),
});
export type UserCreateReq = z.infer<typeof zUsersCreateReq>;

// Get user_wrong
export const zUsersWrongRes = z.array(
  zUserBase
    .omit({
      firstName: true,
      lastName: true,
      password: true,
      dateOfBirth: true,
    })
    .extend({
      firstname: z.string().openapi({ example: "Tom" }),
      lastname: z.string().openapi({ example: "Hardy" }),
      dateOfBirth: z.string().openapi({ example: "2567-01-01" }),
    })
);

// Reset
export const zUsersResetRes = zUsersCreateRes;
