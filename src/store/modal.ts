import { create } from "zustand";
import { ServerWithMembersWithUser } from "../../types";
import { Channel } from "@prisma/client";

export type ModalType =
  | "create-server"
  | "invite-people"
  | "edit-server"
  | "manage-members"
  | "create-channel"
  | "leave-server"
  | "delete-server"
  | "edit-channel"
  | "delete-channel"
  | "send-file-modal";

type ModalData = {
  server?: ServerWithMembersWithUser;
  channel?: Channel;
  channelId?: string;
  serverId?: string;
};

type ModalStore = {
  type: ModalType | null | undefined;
  open: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  open: false,
  data: {},
  onOpen: (type: ModalType, modalData: ModalData | undefined = {}) =>
    set({
      type,
      open: true,
      data: {
        server: modalData.server || undefined,
        channel: modalData.channel || undefined,
        channelId: modalData.channelId || undefined,
        serverId: modalData.serverId || undefined,
      },
    }),
  onClose: () => set({ type: null, open: false, data: {} }),
}));
