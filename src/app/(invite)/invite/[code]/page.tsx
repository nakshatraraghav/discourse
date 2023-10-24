import prisma from "@/server/db/prisma";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { MemberRole } from "@prisma/client";

export default async function InvitePage({
  params,
}: {
  params: {
    code: string;
  };
}) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  if (!params.code) {
    redirect("/");
  }

  const server = await prisma.server.findFirst({
    where: {
      inviteCode: params.code,
    },
    include: {
      members: {
        where: {
          userId: session.user.id,
        },
        take: 1,
      },
    },
  });

  if (!server) {
    return <div>Invalid Invite Code</div>;
  }

  if (server.members[0]) {
    redirect(`/server/${server.id}`);
  }

  const joined = await prisma.member.create({
    data: {
      userId: session.user.id,
      serverId: server.id,
      role: MemberRole.GUEST,
    },
  });

  if (!joined) {
    return <div>Failed to join this server please try again</div>;
  }

  redirect(`/server/${server.id}`);
}
