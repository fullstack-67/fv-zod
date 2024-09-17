import { z } from "zod";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

// * Creating a schema for strings
const mySchema = z.string();

// * Parsing
// mySchema.parse("tuna"); // => "tuna"
// mySchema.parse(12); // => throws ZodError

// * "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// * Extract the inferred type
type User = z.infer<typeof User>;

const yearUpper = dayjs().year();
const yearLower = yearUpper - 100;

export const zUserBase = z.object({
  id: z.string().min(1, { message: "Missing ID" }),
  createdAt: z.number(),
  email: z.string().email({ message: "Invalid email" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Missing date of birth" })
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
      message: "Use format YYYY-MM-DD.",
    }),
});

z.object({
  date: z.string().refine((s) => z.coerce.date().safeParse(s).success, {
    message: "Invalid date",
  }),
});

z.object({
  date: z
    .string()
    .refine((s) => z.coerce.date().safeParse(s).success, {
      message: "Invalid date",
    })
    .refine((d) => new Date(d) <= new Date(), {
      message: "Cannot use future date.",
    }),
});

const formSchema = z
  .object({
    password: z.string().min(1, { message: "Password too short" }),
    confirmPassword: z.string().min(1, { message: "Confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const base3 = z.object({
  first: z.string(),
});
const ext = base3.omit({ first: true }).extend({ second: z.string() });
