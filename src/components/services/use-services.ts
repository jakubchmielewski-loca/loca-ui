"use client";

import { useContext } from "react";
import { ServicesContext } from "./context";
import type { ServicesContextValue } from "./types";

export const useServices = (): ServicesContextValue => {
  const ctx = useContext(ServicesContext);

  if (!ctx) {
    throw new Error("useServices must be used within ServicesProvider");
  }

  return ctx;
};
