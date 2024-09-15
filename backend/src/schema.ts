import { z } from "zod";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
const thisYear = dayjs().year();

export const zUserBase = z.object({
  id: z
    .string()
    .min(1, { message: "Missing ID" })
    .openapi({ example: nanoid() }),
  createdAt: z.number().openapi({ example: new Date().getTime() }),
  firstName: z.string().min(1, { message: "Missing firstname" }),
  lastName: z.string().min(1, { message: "Missing lastname" }),
  email: z.string().email({ message: "Invalid email" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Missing date of birth" })
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
      message: "Use format YYYY-MM-DD.",
    })
    // .refine((s) => z.coerce.date().safeParse(s).success, {
    //   message: "Invalid date",
    // })
    .refine(
      (s) => {
        if (dayjs(s).year() > thisYear) return false;
        return true;
      },
      {
        message: "Wrong calendar",
      }
    )
    .refine(
      (s) => {
        if (dayjs(s).year() < thisYear - 100) return false;
        return true;
      },
      { message: "Year too far back" }
    )
    .openapi({ example: "2024-01-01" }),
  password: z.string().min(4, { message: "Password too short" }),
});

// Get user
export const zUsersRes = z.array(zUserBase.omit({ password: true }));

// Create user
export const zUsersCreateReq = zUserBase
  .omit({ id: true, createdAt: true })
  .extend({
    confirmPassword: z.string().min(1, { message: "Confirm password" }),
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
      firstname: z.string(),
      lastname: z.string(),
      dateOfBirth: z.string(),
    })
);

// Reset
export const zUsersResetRes = zUsersCreateRes;
