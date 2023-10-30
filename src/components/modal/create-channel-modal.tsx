"use client";

import { useMemo } from "react";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

import { useModalStore } from "@/store/modal";
import { CreateChannelForm } from "../server/form/create-channel-form";

export function CreateChannelModal() {
  const { open, onClose, type, data } = useModalStore();
  const opened = type === "create-channel" && open;

  const server = useMemo(() => {
    return data.server;
  }, [data.server]);

  if (!server) {
    return null;
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Server Channels</DialogTitle>
        </DialogHeader>
        <CreateChannelForm serverId={server.id} />
      </DialogContent>
    </Dialog>
  );
}
