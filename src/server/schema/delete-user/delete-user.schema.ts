import { z } from "zod";

export const deleteUserSchema = z.object({
  serverId: z.string(),
});
