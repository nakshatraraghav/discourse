"use client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { CreateServerForm } from "../server/form/create-server-form";

import { useModalStore } from "@/store/modal";

export function CreateServerModal() {
  const { open, onClose, type } = useModalStore();

  const opened = type === "create-server" && open;

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your Server</DialogTitle>
          <DialogDescription>
            Give your server a personality with a name and a image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <CreateServerForm />
      </DialogContent>
    </Dialog>
  );
}
