"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";
import { EditServerForm } from "../server/form/edit-server-form";

export function EditServerModal() {
  const { open, onClose, type } = useModalStore();

  const opened = type === "edit-server" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Server</DialogTitle>
          <DialogDescription>Enter new values</DialogDescription>
        </DialogHeader>
        <EditServerForm />
      </DialogContent>
    </Dialog>
  );
}
