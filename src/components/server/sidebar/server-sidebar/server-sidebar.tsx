import { getServerSession } from "next-auth";
import { options } from "@/server/auth";
import { redirect } from "next/navigation";

import prisma from "@/server/db/prisma";
import { ChannelType } from "@prisma/client";

import { ServerSidebarHeader } from "@/components/server/sidebar/server-sidebar/server-sidebar-header";
import { ServerSearch } from "./server-search";

import { Separator } from "@/components/ui/separator";
import { ServerSection } from "./server-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerMembersChannels } from "./server-members-channels";

export async function ServerSidebar({ serverId }: { serverId: string }) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }
  const text = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audio = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const video = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const userRole = server.members.find(
    (member) => member.userId == session.user.id
  )!.role;

  return (
    <div className="h-full flex flex-col text-primary bg-[#f2f3f5] dark:bg-[#32323219]">
      <ServerSidebarHeader server={server} role={userRole} />
      <ServerSearch
        channels={{ text, audio, video }}
        members={server.members}
      />
      <Separator />
      <ServerMembersChannels
        role={userRole}
        server={server}
        channels={{ text, audio, video }}
      />
    </div>
  );
}
