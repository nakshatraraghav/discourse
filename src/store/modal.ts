import { Channel, Member, Server } from "@prisma/client";
import { create } from "zustand";
import { ServerWithMembersWithUser } from "../../types";

type ModalType =
  | "create-server"
  | "invite-people"
  | "edit-server"
  | "manage-members"
  | "create-channel"
  | "leave-server"
  | "delete-server";

type ModalData = {
  server?: ServerWithMembersWithUser;
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
        server: modalData.server,
      },
    }),
  onClose: () => set({ type: null, open: false, data: {} }),
}));
