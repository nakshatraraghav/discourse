"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";

export function LeaveServerModal() {
  const { open, onClose, type } = useModalStore();
  const opened = type === "leave-server" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Server</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
