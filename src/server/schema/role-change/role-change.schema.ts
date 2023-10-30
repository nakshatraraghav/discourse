import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const roleChangeSchema = z.object({
  serverId: z.string(),
  memberId: z.string(),
  newRole: z.enum([MemberRole.GUEST, MemberRole.MODERATOR, MemberRole.ADMIN]),
});
