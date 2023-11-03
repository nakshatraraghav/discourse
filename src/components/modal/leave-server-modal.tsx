"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useModalStore } from "@/store/modal";
import { useToast } from "@/hooks/use-toast";

export function LeaveServerModal() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { toast } = useToast();

  const {
    open,
    onClose,
    type,
    data: { server },
  } = useModalStore();
  const opened = type === "leave-server" && open;

  async function leaveServer() {
    try {
      const response = await axios.delete(`/api/server/${server?.id}/leave`);

      toast({
        title: "You have successfully left the server",
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to leave the server",
        description: "There has been a fatal error, couldn't leave the server",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Server</DialogTitle>
          <DialogDescription>
            Are you sure that you want to leave{" "}
            <span className="text-semibold text-indigo-500 underline">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant={"ghost"} disabled={loading} onClick={onClose}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={leaveServer}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
