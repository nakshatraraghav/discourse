import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const createChannelFormSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(ChannelType),
});

export const createChannelServerSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(ChannelType),
  serverId: z.string(),
});

export const deleteChannelServerSchema = z.object({
  serverId: z.string(),
});

export const editChanneFormSchema = z.object({
  name: z.string(),
});

export const editChannelServerSchema = z.object({
  name: z.string(),
  serverId: z.string(),
});

export type formSchemaType = z.infer<typeof createChannelFormSchema>;
export type editChannelFormType = z.infer<typeof editChanneFormSchema>;
