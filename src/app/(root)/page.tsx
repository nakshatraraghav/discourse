import { CreateServerModal } from "@/components/modal/initial-modal";
import { options } from "@/server/auth";

import prisma from "@/server/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  const id = session.user.id;

  const memberWithServer = await prisma.member.findFirst({
    where: {
      userId: id,
    },
    include: {
      server: true,
    },
  });

  if (memberWithServer) {
    const serverId = memberWithServer.server.id;

    redirect(`/server/${serverId}`);
  }

  return <CreateServerModal />;
}
