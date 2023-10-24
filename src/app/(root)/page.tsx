import { CreateServerModal } from "@/components/modal/initial-modal";

import prisma from "@/server/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  const id = session!.user.id;

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: id,
        },
      },
    },
  });

  if (server) {
    redirect(`server/${server.id}`);
  }

  return <CreateServerModal />;
}
