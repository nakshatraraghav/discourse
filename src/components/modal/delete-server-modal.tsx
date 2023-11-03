"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";

export function DeleteServerModal() {
  const { open, onClose, type } = useModalStore();
  const opened = type === "delete-server" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Server</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
