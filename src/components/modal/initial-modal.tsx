"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { CreateServerForm } from "../server/form/create-server-form";

export function CreateServerModal() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open>
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
