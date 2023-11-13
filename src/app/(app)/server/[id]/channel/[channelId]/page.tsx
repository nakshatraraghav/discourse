import { options } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/server/db/prisma";
import { ChatHeader } from "@/components/chat/chat-header";

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
    <div>
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
}
