import { z } from "zod";

export const messageSchema = z.object({
  body: z.string().min(1),
  fileUrl: z.string().url().min(1),
  channelId: z.string().min(1),
  serverId: z.string().min(1),
});

export type messageSchemaType = z.infer<typeof messageSchema>;
