import { create } from "zustand";

type socketStatus = "connected" | "disconnected" | "failure" | "initial";

type socketData = {
  status: socketStatus;
  setStatus: (status: socketStatus) => void;
};

export const useSocketStore = create<socketData>((set) => ({
  status: "initial",
  setStatus: (newStatus: socketStatus) =>
    set({
      status: newStatus,
    }),
}));
