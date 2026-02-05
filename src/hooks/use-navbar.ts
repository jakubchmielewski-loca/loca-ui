"use client";

import { create } from "zustand";

type NavbarStore = {
  opened: boolean;
  toggle: () => void;
  setOpened: (value: boolean) => void;
};

const useNavbar = create<NavbarStore>((set, get) => ({
  opened: false,
  toggle: () => set({ opened: !get().opened }),
  setOpened: (value) => set({ opened: value }),
}));

export default useNavbar;
