import { z } from "zod";
import dayjs from "dayjs";

const thisYear = dayjs().year();

export const userSchema = z
  .object({
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
      ),
    password: z.string().min(4, { message: "Password too short" }),
    confirmPassword: z.string().min(1, { message: "Confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
