import { z } from "zod";

export const sendToBankValidator = z.object({
  accountNumber: z.string(),
  amount: z.string(),
  narration: z.string(),
});

export type SendToBankSchema = z.infer<typeof sendToBankValidator>;
