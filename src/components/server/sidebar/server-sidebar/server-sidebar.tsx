import { ServerSidebarHeader } from "@/components/server/sidebar/server-sidebar/server-sidebar-header";
import { options } from "@/server/auth";
import prisma from "@/server/db/prisma";
import { ChannelType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }
  const { channels, members, ...serverDetails } = server;

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
    <div className="h-full flex flex-col text-primary bg-[#f2f3f5] dark:bg-[#1515158e]">
      <ServerSidebarHeader server={serverDetails} role={userRole} />
    </div>
  );
}
