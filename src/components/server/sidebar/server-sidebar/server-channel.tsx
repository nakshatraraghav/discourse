"use client";

import React from "react";

import { useParams, useRouter } from "next/navigation";

import { Channel, ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithUser } from "../../../../../types";

import { Delete, Edit, Hash, Mic, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { ModalType, useModalStore } from "@/store/modal";
import { LockClosedIcon } from "@radix-ui/react-icons";

interface ServerChannelProps {
  channel: Channel;
  server: ServerWithMembersWithUser;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export function ServerChannel({ channel, server, role }: ServerChannelProps) {
  const params = useParams();
  const router = useRouter();

  const { onOpen } = useModalStore();

  const Icon = iconMap[channel.type];

  const moderator = role === "ADMIN" || role === "MODERATOR";

  function onClick() {
    router.push(`/server/${params?.id}/channel/${channel.id}`);
  }

  const onAction = (e: React.MouseEvent, modal: ModalType) => {
    e.stopPropagation();
    onOpen(modal, { server, channel });
  };

  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      size={"sm"}
      className={cn(
        "group rounded-md gap-x-2 w-full mb-1",
        params.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <div className="w-full flex items-center justify-between pr-4">
        <div className="flex items-center space-x-1">
          <Icon className="text-zinc-500 group-hover:text-zinc-300" size="15" />
          <p
            className={cn(
              "font-semibold text-[13px] text-zinc-500 group-hover:text-neutral-300",
              params.channelId === channel.id && "text-primary"
            )}
          >
            {channel.name}
          </p>
        </div>
        {moderator && channel.name !== "general" && (
          <div className="flex items-center space-x-2">
            <Tooltip label="Edit Channel" side="right" align="center">
              <Edit
                onClick={(ev) => {
                  onAction(ev, "edit-channel");
                }}
                className="hidden group-hover:block w-4 h-4 text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              />
            </Tooltip>
            <Tooltip label="Delete Channel" side="right" align="center">
              <Trash2
                onClick={(ev) => {
                  onAction(ev, "delete-channel");
                }}
                className="hidden group-hover:block w-4 h-4 text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              />
            </Tooltip>
          </div>
        )}
        {channel.name === "general" && (
          <Tooltip
            label="Cannot edit general channel"
            side="right"
            align="center"
          >
            <LockClosedIcon
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              className="hidden group-hover:block w-4 h-4 text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </Tooltip>
        )}
      </div>
    </Button>
  );
}
