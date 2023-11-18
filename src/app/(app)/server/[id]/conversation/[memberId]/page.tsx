import { getServerSession } from "next-auth";
import { options } from "@/server/auth";
import { redirect } from "next/navigation";

import prisma from "@/server/db/prisma";
import { getOrCreateConversation } from "@/server/services/conversation.service";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";

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

  const conversation = await getOrCreateConversation(
    member.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/server/${params.id}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.userId === session.user.id ? memberTwo : memberOne;

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name={otherMember.user.name ?? "username"}
        serverId={params.id}
        type="conversation"
        image={otherMember.user.image ?? ""}
      />
      <ChatMessages
        member={member}
        chatId={conversation.id}
        type="direct-conversation"
        name={otherMember.user.username ?? ""}
      />
      <ChatInput
        type="direct-conversation"
        name={otherMember.user.username ?? ""}
        serverId={member.serverId}
        conversationId={conversation.id}
      />
    </div>
  );
}
