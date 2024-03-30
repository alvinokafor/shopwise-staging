import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must not be more than 32 characters" }),
});

export const registerValidator = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must not be more than 32 characters" }),
  firstName: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters" })
    .max(32, { message: "Firstname must not be more than 32 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters" })
    .max(32, { message: "Lastname must not be more than 32 characters" }),
});

export const resetPasswordValidator = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must not be more than 32 characters" }),
});

export type LoginSchema = z.infer<typeof loginValidator>;
export type RegisterSchema = z.infer<typeof registerValidator>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordValidator>;
