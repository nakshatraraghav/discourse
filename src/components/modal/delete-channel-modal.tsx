"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";

export function DeleteChannelModal() {
  const { open, onClose, type, data } = useModalStore();

  const { channel } = data;

  const opened = type === "delete-channel" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {channel?.name} Channel</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
