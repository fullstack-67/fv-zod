import * as z from "zod";
import dayjs from "dayjs";

const userSchema = z.object({
  id: z.string().min(1, { message: "Missing ID" }),
  createdAt: z.number(),
  firstName: z.string().min(1, { message: "Missing firstname" }),
  lastName: z.string().min(1, { message: "Missing lastname" }),
  email: z.string().email({ message: "Invalid email" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Missing date of birth" })
    .refine((s) => z.coerce.date().safeParse(s).success, {
      message: "Invalid date of birth",
    })
    .refine(
      (s) => {
        const yearNow = dayjs().year();
        const year = dayjs(s).year();
        if (year > yearNow) return false;
        return true;
      },
      {
        message: "Wrong calendar",
      }
    )
    .refine(
      (s) => {
        const yearNow = dayjs().year();
        const year = dayjs(s).year();
        if (year < yearNow - 100) return false;
        return true;
      },
      { message: "Year too far back" }
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
