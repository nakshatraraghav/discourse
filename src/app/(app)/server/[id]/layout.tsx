import { options } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/server/db/prisma";
import { ServerSidebar } from "@/components/server/sidebar/server-sidebar/server-sidebar";

interface ServerLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default async function ServerLayout({
  children,
  params: { id },
}: ServerLayoutProps) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  const server = await prisma.server.findUnique({
    where: {
      id,
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden h-full md:flex flex-col fixed inset-y-0 w-60">
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="ml-60">{children}</main>
    </div>
  );
}
