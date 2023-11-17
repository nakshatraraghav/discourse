import { Server, Member, Channel, User, Message } from "@prisma/client";

export type ServerWithMembersWithUser = Server & {
  members: (Member & { user: User })[];
  channels: Channel[];
};

export type MessageWithUser = Message & { member: Member & { user: User } };
