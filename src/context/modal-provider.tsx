"use client";

import React, { useEffect } from "react";

import { CreateServerModal } from "@/components/modal/create-server-modal";
import { InvitePeopleModal } from "@/components/modal/invite-people";
import { EditServerModal } from "@/components/modal/edit-server-modal";

export function ModalProvider() {
  const [mounted, setMounted] = React.useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <React.Fragment>
      <CreateServerModal />
      <InvitePeopleModal />
      <EditServerModal />
    </React.Fragment>
  );
}
