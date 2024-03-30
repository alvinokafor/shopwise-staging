import { z } from "zod";

export const createBeneficiaryValidator = z.object({
  nickName: z
    .string()
    .min(3, { message: "Full name must be more than 3 characters" })
    .max(32, { message: "Full name must not be more than 32 characters" }),
  address: z.string(),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
});

export type CreateBeneficiarySchema = z.infer<
  typeof createBeneficiaryValidator
>;
