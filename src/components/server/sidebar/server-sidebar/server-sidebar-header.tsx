import { MemberRole, Server } from "@prisma/client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SidebarDropdown } from "@/components/dropdown/server-header-dropdown";

interface ServerSidebarHeaderProps {
  server: Server;
  role: MemberRole;
}

export function ServerSidebarHeader({
  server,
  role,
}: ServerSidebarHeaderProps) {
  return (
    <SidebarDropdown role={role} server={server}>
      <button className="w-full h-14 border-b-[2px] border-b-neutral-800 hover:bg-[#151515d7] transition-all duration-300">
        <div className="flex items-center justify-between mx-4">
          <div className="text-sm font-semibold truncate">{server.name}</div>
          <ChevronDownIcon />
        </div>
      </button>
    </SidebarDropdown>
  );
}
