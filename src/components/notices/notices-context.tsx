"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { NoticesContextValue } from "./types";

const NoticesContext = createContext<NoticesContextValue | null>(null);

export type NoticesProviderProps = NoticesContextValue & {
  children: ReactNode;
};

export const NoticesProvider = ({
  children,
  ...rest
}: NoticesProviderProps) => {
  const {
    items,
    unreadCount,
    isLoading,
    error,
    onMarkAsRead,
    onMarkAllAsRead,
    onNoticeClick,
    emptyLabel,
  } = rest;

  const value = useMemo<NoticesContextValue>(
    () => rest,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      items,
      unreadCount,
      isLoading,
      error,
      onMarkAsRead,
      onMarkAllAsRead,
      onNoticeClick,
      emptyLabel,
    ]
  );

  return (
    <NoticesContext.Provider value={value}>{children}</NoticesContext.Provider>
  );
};

export const useNoticesContext = (): NoticesContextValue | null => {
  return useContext(NoticesContext);
};
