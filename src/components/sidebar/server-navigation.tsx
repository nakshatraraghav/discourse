import Image from "next/image";
import prisma from "@/server/db/prisma";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

export async function ServerNavigation() {
  const session = await getServerSession(options);

  const id = session!.user.id;

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          userId: id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full py-3">
      {servers.map((server) => {
        return (
          <div key={server.id}>
            <Image
              src={server.image}
              alt="server logo"
              key={server.id}
              height={40}
              width={40}
            />
          </div>
        );
      })}
    </div>
  );
}
