"use client";

import axios from "axios";

import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useModalStore } from "@/store/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteChannelModal() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const { open, onClose, type, data } = useModalStore();
  const { channel, server } = data;
  const opened = type === "delete-channel" && open;

  const { toast } = useToast();

  async function deleteChannel() {
    try {
      setLoading(true);

      await axios.delete(`/api/channels/${channel?.id}`, {
        data: {
          serverId: server?.id,
        },
      });

      toast({
        title: "You have successfully deleted the Channel",
      });

      onClose();

      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Unable to delete the Channel",
        description:
          "There has been a fatal error, couldn't delete the channel",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Channel</DialogTitle>
          <DialogDescription className="space-x-2">
            Are you sure that you want to delete
            <span className="text-semibold mx-2 text-indigo-500 underline">
              {channel?.name}
            </span>
            of type {channel?.type.toLocaleLowerCase()}
          </DialogDescription>
          <DialogFooter>
            <div className="flex items-center justify-between w-full mt-5">
              <Button variant={"outline"} disabled={loading} onClick={onClose}>
                Cancel
              </Button>
              <Button variant={"destructive"} onClick={deleteChannel}>
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
