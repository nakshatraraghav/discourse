"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@/components/ui/tooltip";

export function SidebarAction() {
  return (
    <Tooltip label="Add a server" side="right" align="start">
      <div className="group flex item mt-2">
        <button className="flex items-center justify-center h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-[#161515] group-hover:bg-blue-500">
          <PlusIcon className="group-hover:text-white transition text-blue-400 h-[24px] w-[24px]" />
        </button>
      </div>
    </Tooltip>
  );
}
