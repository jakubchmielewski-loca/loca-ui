"use client";

import { useContext } from "react";
import { NoticesContext } from "./context";
import type { NoticesContextValue } from "./types";

export const useNotices = (): NoticesContextValue => {
  const ctx = useContext(NoticesContext);

  if (!ctx) {
    throw new Error("useNotices must be used within NoticesProvider");
  }

  return ctx;
};
