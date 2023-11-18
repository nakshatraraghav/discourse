import { getServerSession } from "next-auth";
import { options } from "@/server/auth";
import { redirect } from "next/navigation";

import prisma from "@/server/db/prisma";
import { findOrCreateConversation } from "@/server/services/conversation.service";
import { ChatHeader } from "@/components/chat/chat-header";

interface ConversationPageProps {
  params: {
    id: string;
    memberId: string;
  };
}

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/login");
  }

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.id,
      userId: session.user.id,
    },
    include: {
      user: true,
    },
  });

  if (!member) {
    return redirect("/");
  }

  const conversation = await findOrCreateConversation({
    memberOneId: member.id,
    memberTwoId: params.memberId,
  });

  if (!conversation) {
    return redirect(`/server/${params.id}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.id !== session.user.id ? memberTwo : memberOne;

  return (
    <div>
      <ChatHeader
        name={otherMember.user.name ?? "username"}
        serverId={params.id}
        type="conversation"
        image={otherMember.user.image ?? ""}
      />
    </div>
  );
}
