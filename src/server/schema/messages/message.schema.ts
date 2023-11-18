import { z } from "zod";

export const messageSchema = z.object({
  body: z.string().min(1),
  fileUrl: z.string().url().min(1).optional(),
  channelId: z.string().min(1),
  serverId: z.string().min(1),
});

export const directMessageSchema = z.object({
  body: z.string().min(1),
  fileUrl: z.string().url().min(1).optional(),
  conversationId: z.string().min(1),
  serverId: z.string().min(1),
});

export const messageUpdateSchema = z.object({
  text: z.string().min(1),
});

export type messageUpdateSchemaType = z.infer<typeof messageUpdateSchema>;

export type messageSchemaType = z.infer<typeof messageSchema>;
