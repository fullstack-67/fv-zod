import * as z from "zod";

const userSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, { message: "Missing firstname" }),
  lastName: z.string().min(1, { message: "Missing lastname" }),
  email: z.string().email({ message: "Invalid email" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Missing date of birth" })
    .refine((s) => z.coerce.date().safeParse(s).success, {
      message: "Invalid date of birth",
    })
    .refine((s) => new Date(s) < new Date(), {
      message: "Wrong calendar",
    }),
});

// Array of users
export const usersSchema = z.array(userSchema);

// Type
export type User = z.infer<typeof userSchema>;

// Form validation
export const formSchema = userSchema
  .omit({ id: true })
  .extend({
    password: z.string().min(4, { message: "Password too short" }),
    confirmPassword: z.string().min(1, { message: "Confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type Form = z.infer<typeof formSchema>;
