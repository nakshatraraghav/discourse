import { Server } from "@prisma/client";
import { create } from "zustand";

type ModalType =
  | "create-server"
  | "invite-people"
  | "edit-server"
  | "manage-members";

type ModalData = {
  server?: Server;
};

type ModalStore = {
  type: ModalType | null;
  open: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  open: false,
  data: {},
  onOpen: (type: ModalType, modalData: ModalData = {}) =>
    set({
      type,
      open: true,
      data: {
        server: modalData.server,
      },
    }),
  onClose: () => set({ type: null, open: false, data: {} }),
}));
