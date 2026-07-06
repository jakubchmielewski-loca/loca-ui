"use client";

import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { NoticesContext } from "./context";
import { NoticesDrawer } from "./notices-drawer";
import type { NoticesContextValue, NoticesProviderProps } from "./types";

export const NoticesProvider = ({
  children,
  items,
  unreadCount: unreadCountOverride,
  isLoading,
  error,
  onMarkAsRead,
  onMarkAllAsRead,
  onNoticeClick,
  emptyLabel,
}: NoticesProviderProps) => {
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const unreadCount =
    unreadCountOverride ?? items.filter((item) => item.isUnread).length;

  const value = useMemo<NoticesContextValue>(
    () => ({
      items,
      unreadCount,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      ...(isLoading !== undefined ? { isLoading } : {}),
      ...(error !== undefined ? { error } : {}),
      ...(onMarkAsRead !== undefined ? { onMarkAsRead } : {}),
      ...(onMarkAllAsRead !== undefined ? { onMarkAllAsRead } : {}),
      ...(onNoticeClick !== undefined ? { onNoticeClick } : {}),
      ...(emptyLabel !== undefined ? { emptyLabel } : {}),
    }),
    [
      items,
      unreadCount,
      isLoading,
      error,
      onMarkAsRead,
      onMarkAllAsRead,
      onNoticeClick,
      emptyLabel,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    ]
  );

  return (
    <NoticesContext.Provider value={value}>
      {children}
      <NoticesDrawer />
    </NoticesContext.Provider>
  );
};
