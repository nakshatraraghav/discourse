"use client";

import React, { useEffect } from "react";

import { CreateServerModal } from "@/components/modal/create-server-modal";
import { InvitePeopleModal } from "@/components/modal/invite-people";
import { EditServerModal } from "@/components/modal/edit-server-modal";
import { ManageMembersModal } from "@/components/modal/manage-members";
import { CreateChannelModal } from "@/components/modal/create-channel-modal";
import { LeaveServerModal } from "@/components/modal/leave-server-modal";
import { DeleteServerModal } from "@/components/modal/delete-server-modal";
import { EditChannelModal } from "@/components/modal/edit-channel-modal";
import { DeleteChannelModal } from "@/components/modal/delete-channel-modal";

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
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <EditChannelModal />
      <DeleteChannelModal />
    </React.Fragment>
  );
}
