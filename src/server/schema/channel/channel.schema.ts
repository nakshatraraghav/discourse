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

export type formSchemaType = z.infer<typeof createChannelFormSchema>;
