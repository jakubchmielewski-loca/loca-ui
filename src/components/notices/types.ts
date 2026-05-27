export type NoticeItem = {
  id: string | number;
  title: string;
  message: string;
  source?: "KARTOTEKA" | "KD_ADMIN" | "RCP_ADMIN" | "RCP_PRACOWNIK";
  createdAt: string | Date;
  isUnread: boolean;
  actionUrl?: string;
};

export type NoticesContextValue = {
  items: NoticeItem[];
  unreadCount?: number;
  isLoading?: boolean;
  error?: string | null;
  onMarkAsRead?: (id: NoticeItem["id"]) => void;
  onMarkAllAsRead?: () => void;
  onNoticeClick?: (notice: NoticeItem) => void;
  emptyLabel?: string;
};
