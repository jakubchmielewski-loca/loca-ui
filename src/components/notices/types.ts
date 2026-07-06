import type { ReactNode } from "react";

export type NoticeItem = {
  id: string | number;
  title: string;
  message: string;
  source?:
    | "KAR_ADMIN"
    | "KD_ADMIN"
    | "RCP_ADMIN"
    | "RCP_PRACOWNIK"
    | "ESW_ADMIN"
    | "KRT"
    | "KRT_OPS"
    | "SRV"
    | "SRV_OPS";
  createdAt: string | Date;
  isUnread: boolean;
  actionUrl?: string;
};

export type NoticesData = {
  items: NoticeItem[];
  unreadCount?: number;
  isLoading?: boolean;
  error?: string | null;
  onMarkAsRead?: (id: NoticeItem["id"]) => void;
  onMarkAllAsRead?: () => void;
  onNoticeClick?: (notice: NoticeItem) => void;
  emptyLabel?: string;
};

export type NoticesContextValue = NoticesData & {
  unreadCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export type NoticesProviderProps = NoticesData & {
  children: ReactNode;
};
