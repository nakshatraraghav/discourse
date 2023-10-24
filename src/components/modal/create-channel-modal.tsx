"use client";

import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";

export function CreateChannelModal() {
  const { open, onClose, type } = useModalStore();
  const opened = type === "create-channel" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Server Channels</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
