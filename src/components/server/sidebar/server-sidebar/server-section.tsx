"use client";

import type { ChannelType, MemberRole } from "@prisma/client";
import type { ServerWithMembersWithUser } from "../../../../../types";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

import { PlusIcon } from "@radix-ui/react-icons";
import { useModalStore } from "@/store/modal";

import { Cog } from "lucide-react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server: ServerWithMembersWithUser;
}

export function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const moderator = role === "ADMIN" || role === "MODERATOR";

  const { onOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between py-2 px-4">
      <p className="text-xs text-zinc-300 font-bold text">{label}</p>
      {moderator && sectionType === "channels" && (
        <Tooltip label={"Add Text Channel"} align="center" side="right">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              onOpen("create-channel", {
                server,
              });
            }}
          >
            <PlusIcon className="text-zinc-500" />
          </Button>
        </Tooltip>
      )}
      {moderator && sectionType === "members" && (
        <Tooltip label={"Manage Members"} align="center" side="right">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="p-[9px]"
            onClick={() => {
              onOpen("manage-members", {
                server,
              });
            }}
          >
            <Cog className="text-zinc-500" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
