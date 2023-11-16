import { options } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";

import prisma from "@/server/db/prisma";

interface ChannelPageProps {
  params: {
    id: string;
    channelId: string;
  };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      serverId: params.id,
      userId: session.user.id,
    },
  });

  if (!channel || !member) {
    return <div>Channel not found</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <div className="flex-1">messages</div>
      <ChatInput type="channel" name={channel.name} />
    </div>
  );
}
