import prisma from "@/server/db/prisma";
import { getServerSession } from "next-auth";
import { options } from "@/server/auth";
import { redirect } from "next/navigation";

interface ServerPageProps {
  params: {
    id: string;
  };
}

export default async function ServerPage({ params }: ServerPageProps) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/login");
  }

  const server = await prisma.server.findMany({
    where: {
      id: params.id,
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: {
            equals: "general",
          },
        },
        take: 1,
      },
    },
  });

  const channel = server[0].channels;

  if (!channel) {
    return <div>General Channel Was Somehow deleted</div>;
  }

  const general = channel[0];

  return redirect(`/server/${params.id}/channel/${general.id}`);
}
