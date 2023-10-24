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

export function ManageMembersModal() {
  const { open, onClose, type } = useModalStore();
  const opened = type === "manage-members" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Server Members</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
