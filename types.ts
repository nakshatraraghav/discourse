import { Server, Member, Channel } from "@prisma/client";

export type ServerWithMembersWithUser = Server & {
  members: Member[];
  channels: Channel[];
};
