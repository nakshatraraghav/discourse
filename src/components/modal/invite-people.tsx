"use client";

import { useState, useRef } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

import { useModalStore } from "@/store/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InvitePeopleModal() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<boolean>(false);
  const { open, onClose, type, data } = useModalStore();
  const opened = type === "invite-people" && open;

  const invite = `${useOrigin()}/invite/${data.server?.inviteCode}`;

  function onCopy() {
    navigator.clipboard.writeText(invite);
    toast({
      title: "Copied Invite Link",
      description: "Invite link has been copied to your Clipboard",
    });
    setCopied(true);
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite People To Your Server</DialogTitle>
        </DialogHeader>
        <Label>Server Invite Link</Label>
        <div className="flex justify-between items-center space-x-4">
          <Input value={invite ?? ""} readOnly />
          <Button variant={"outline"} size={"sm"} onClick={onCopy}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
