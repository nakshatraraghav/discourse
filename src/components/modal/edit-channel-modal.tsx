"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";
import { EditChannellForm } from "@/components/server/form/edit-channel-form";

export function EditChannelModal() {
  const { open, onClose, type, data } = useModalStore();

  const { channel, server } = data;

  const opened = type === "edit-channel" && open;

  if (!channel || !server) {
    return "Channel Or Server Undefined";
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {channel?.name} Channel</DialogTitle>
          <DialogDescription>Enter new values</DialogDescription>
        </DialogHeader>
        <EditChannellForm
          channelId={channel.id ?? ""}
          serverId={server.id ?? ""}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
