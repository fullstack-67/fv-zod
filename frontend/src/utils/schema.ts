import * as z from "zod";
import dayjs from "dayjs";

const yearUpper = dayjs().year();
const yearLower = yearUpper - 100;

const userSchema = z.object({
  id: z.string().min(1, { message: "Missing ID" }),
  createdAt: z.number(),
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
    ),
});

// Array of users
export const usersSchema = z.array(userSchema);

// Type
export type User = z.infer<typeof userSchema>;

// Form validation
export const formSchema = userSchema
  .omit({ id: true, createdAt: true })
  .extend({
    password: z.string().min(4, { message: "Password too short" }),
    confirmPassword: z.string().min(1, { message: "Confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type Form = z.infer<typeof formSchema>;
