"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Member } from "@prisma/client";
import { MessageWithUser } from "../../../types";

import { format } from "date-fns";
import { Avatar } from "../avatar/avatar";

import { Edit, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import { Tooltip } from "../ui/tooltip";
import { ChatRenderMedia } from "./chat-render-media";
import { EditMessageForm } from "./edit-message-form";
import axios from "axios";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

interface ChatMessageItemProps {
  message: MessageWithUser;
  currentMember: Member;
}

export function ChatMessageItem({
  message,
  currentMember,
}: ChatMessageItemProps) {
  const [isUserEditing, setIsUserEditing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleKeydDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setIsUserEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeydDown);

    return () => window.removeEventListener("keydown", handleKeydDown);
  }, []);

  async function deleteMessage() {
    const url = qs.stringifyUrl({
      url: `/api/messages/${message.id}`,
      query: {
        messageId: message.id,
        serverId: message.serverId,
      },
    });

    await axios.delete(url);
  }

  const deleteMessageMutation = useMutation({
    mutationKey: [`chat:message:delete:${message.id}`],
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`chat:${message.channelId}`],
      });
    },
  });

  const timestamp = format(new Date(message.createdAt), DATE_FORMAT);
  const isUpdated = message.updatedAt !== message.createdAt;
  const user = message.member.user;

  const accessControl = {
    isAdmin: currentMember.role === "ADMIN",
    isModerator: currentMember.role === "MODERATOR",
    isMessageAuthor: currentMember.id === message.member.id,
  };

  const permissions = {
    canDelete:
      accessControl.isAdmin ||
      accessControl.isModerator ||
      accessControl.isMessageAuthor,
    canEdit: accessControl.isMessageAuthor,
  };

  const fileType = message.fileUrl?.split(".").pop();

  const file = {
    isPdf: fileType === "pdf",
    isImage: ["png", "jpg", "jpeg", "gif"].includes(fileType ?? ""),
    isVideo: ["mp4", "mov", "avi"].includes(fileType ?? ""),
  };

  return (
    <div className="relative p-4 transition-all w-full group flex items-center hover:bg-black/10">
      <div className="w-full group flex gap-x-2 items-start">
        <div className="cursor-pointer hover:drop-shadow-md transition-all">
          <Avatar image={user.image ?? ""} className="w-10 h-10" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2 font-semibold">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {user.username}
              </p>
              <Tooltip label={message.member.role}>
                {roleIconMap[message.member.role]}
              </Tooltip>
            </div>
            <div className="text-xs text-zinc-400 font-semibold">
              {timestamp}
            </div>
          </div>
          {!message.deleted && <ChatRenderMedia fileUrl={message.fileUrl} />}
          {!isUserEditing && !message.deleted && (
            <p className={"text-sm text-zinc-600 dark:text-zinc-300"}>
              {message.text}
            </p>
          )}
          {!message.deleted && isUserEditing && (
            <EditMessageForm
              messageId={message.id}
              serverId={message.serverId}
              chatId={message.channelId}
              setIsUserEditing={setIsUserEditing}
            />
          )}
          {message.deleted && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 italic line-through">
              Message Has Been Deleted
            </p>
          )}
        </div>
      </div>
      {permissions.canDelete && !message.deleted && (
        <div className="p-1 -top-2 right-5 hidden group-hover:flex items-center gap-x-3 absolute bg-white dark:bg-[#100e0d] border rounded-sm">
          {permissions.canEdit && (
            <Tooltip label="Edit">
              <Edit
                onClick={() => setIsUserEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </Tooltip>
          )}
          <Tooltip label="Delete">
            <Trash
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              onClick={() => {
                deleteMessageMutation.mutate();
              }}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
