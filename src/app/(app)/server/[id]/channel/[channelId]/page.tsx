import React from "react";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

import prisma from "@/server/db/prisma";
import { ChannelType } from "@prisma/client";
import { LiveKitMediaRoom } from "@/components/livekit/livekit-media-room";

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
      {channel.type === ChannelType.TEXT && (
        <React.Fragment>
          <ChatHeader
            name={channel.name}
            serverId={channel.serverId}
            type="channel"
          />
          <ChatMessages
            member={member}
            chatId={channel.id}
            type="channel"
            name={channel.name}
          />
          <ChatInput
            type="channel"
            name={channel.name}
            channelId={channel.id}
            serverId={channel.serverId}
          />
        </React.Fragment>
      )}
      {channel.type === ChannelType.AUDIO && (
        <React.Fragment>
          <LiveKitMediaRoom chatId={channel.id} audio={true} video={false} />
        </React.Fragment>
      )}
      {channel.type === ChannelType.VIDEO && (
        <React.Fragment>
          <LiveKitMediaRoom chatId={channel.id} audio={true} video={true} />
        </React.Fragment>
      )}
    </div>
  );
}
