import type { ReactNode } from "react";

export type NoticesTab = "all" | "unread";

export type NoticeItem = {
  id: string | number;
  message: string;
  createdAt: string | Date;
  isUnread: boolean;
  actionUrl?: string;
};

export type NoticeWithCategory = NoticeItem & {
  categoryId: string;
};

export type NoticeCategoryDefinition = {
  id: string;
  label: string;
};

export type NoticeCategory = {
  id: string;
  label: string;
  unreadCount: number;
};

export type NoticesData = {
  items: NoticeItem[];
  categories: NoticeCategory[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  activeTab: NoticesTab;
  onTabChange: (tab: NoticesTab) => void;
  totalCount: number;
  unreadCount: number;
  globalUnreadCount: number;
  isLoading?: boolean;
  error?: string | null;
  onMarkAsRead: (id: NoticeItem["id"]) => void;
  onMarkAllAsRead?: () => void;
  onDelete: (id: NoticeItem["id"]) => void;
  onNoticeClick?: (notice: NoticeItem) => void;
  onViewAll: () => void;
  emptyLabel?: string;
};

export type NoticesContextValue = NoticesData & {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type NoticesProviderProps = NoticesData & {
  children: ReactNode;
};
