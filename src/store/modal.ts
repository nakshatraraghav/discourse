import { create } from "zustand";

type ModalType = "create-server";

type ModalStore = {
  type: ModalType | null;
  open: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type: ModalType) => set({ type, open: true }),
  onClose: () => set({ type: null, open: false }),
}));
