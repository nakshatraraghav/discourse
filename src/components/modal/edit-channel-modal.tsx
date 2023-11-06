"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";

export function EditChannelModal() {
  const { open, onClose, type, data } = useModalStore();

  const { channel } = data;

  console.log(channel);

  const opened = type === "edit-channel" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {channel?.name} Channel</DialogTitle>
          <DialogDescription>Enter new values</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
