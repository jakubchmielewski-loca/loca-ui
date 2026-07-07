"use client";

import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { NoticesContext } from "./context";
import type { NoticesContextValue, NoticesProviderProps } from "./types";

export const NoticesProvider = ({
  children,
  items,
  categories,
  selectedCategoryId,
  onCategoryChange,
  activeTab,
  onTabChange,
  totalCount,
  unreadCount,
  globalUnreadCount,
  isLoading,
  error,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onNoticeClick,
  onViewAll,
  emptyLabel,
}: NoticesProviderProps) => {
  const [isOpen, { open, close, toggle }] = useDisclosure(false);

  const value = useMemo<NoticesContextValue>(
    () => ({
      items,
      categories,
      selectedCategoryId,
      onCategoryChange,
      activeTab,
      onTabChange,
      totalCount,
      unreadCount,
      globalUnreadCount,
      isOpen,
      open,
      close,
      toggle,
      onMarkAsRead,
      onDelete,
      onViewAll,
      ...(isLoading !== undefined ? { isLoading } : {}),
      ...(error !== undefined ? { error } : {}),
      ...(onMarkAllAsRead !== undefined ? { onMarkAllAsRead } : {}),
      ...(onNoticeClick !== undefined ? { onNoticeClick } : {}),
      ...(emptyLabel !== undefined ? { emptyLabel } : {}),
    }),
    [
      items,
      categories,
      selectedCategoryId,
      onCategoryChange,
      activeTab,
      onTabChange,
      totalCount,
      unreadCount,
      globalUnreadCount,
      isLoading,
      error,
      onMarkAsRead,
      onMarkAllAsRead,
      onDelete,
      onNoticeClick,
      onViewAll,
      emptyLabel,
      isOpen,
      open,
      close,
      toggle,
    ]
  );

  return (
    <NoticesContext.Provider value={value}>{children}</NoticesContext.Provider>
  );
};
