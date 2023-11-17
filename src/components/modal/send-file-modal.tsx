"use client";

import { useModalStore } from "@/store/modal";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import { SendFileForm } from "@/components/server/form/send-file-form";

export function SendFileModal() {
  const { open, onClose, type, data } = useModalStore();

  const channelId = data.channelId ?? "";
  const serverId = data.serverId ?? "";

  const opened = type === "send-file-modal" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an Attachment</DialogTitle>
          <DialogDescription>Send a file as an message.</DialogDescription>
        </DialogHeader>
        <SendFileForm
          serverId={serverId}
          channelId={channelId}
          type="channel"
        />
      </DialogContent>
    </Dialog>
  );
}
