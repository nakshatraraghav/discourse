import { Server, Member, Channel, User } from "@prisma/client";

export type ServerWithMembersWithUser = Server & {
  members: (Member & { user: User })[];
  channels: Channel[];
};
