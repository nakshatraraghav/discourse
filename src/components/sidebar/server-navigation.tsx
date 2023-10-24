import { options } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prisma from "@/server/db/prisma";

import { ProfileDropdown } from "../dropdown/profile-dropdown";
import { RenderSidebarActionWithSeparator } from "./render-sidebar-action";
import { Avatar } from "@/components/avatar/avatar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarItem } from "./sidebar-item";

export async function ServerNavigation() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  const {
    user: { image, id },
  } = session;

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
    <div className="bg-[#e3e5e8] dark:bg-stone-950 space-y-4 flex flex-col items-center h-full py-3">
      <RenderSidebarActionWithSeparator />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => {
          return (
            <div key={server.id} className="mb-6">
              <SidebarItem
                id={server.id}
                image={server.image}
                name={server.name}
              />
            </div>
          );
        })}
      </ScrollArea>
      <ProfileDropdown>
        <Avatar image={image ?? ""} />
      </ProfileDropdown>
    </div>
  );
}
