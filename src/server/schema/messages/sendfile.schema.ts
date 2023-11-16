import { z } from "zod";

export const sendFileFormSchema = z.object({
  body: z.string().min(1),
  image: z.string().min(1, "Server image is required"),
});

export type sendFileFormSchema = z.infer<typeof sendFileFormSchema>;
