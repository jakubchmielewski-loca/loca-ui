import type {
  NoticeCategory,
  NoticeItem,
  NoticeWithCategory,
  NoticesTab,
} from "./types";

export const DEFAULT_NOTICES_PREVIEW_LIMIT = 5;

export const resolveSelectedCategoryId = (
  categories: NoticeCategory[],
  selectedCategoryId: string,
  defaultCategoryId?: string | undefined,
): string => {
  if (categories.some((category) => category.id === selectedCategoryId)) {
    return selectedCategoryId;
  }

  return categories[0]?.id ?? defaultCategoryId ?? "";
};

export const getCategoryNotices = (
  notices: NoticeWithCategory[],
  categoryId: string,
): NoticeWithCategory[] =>
  notices.filter((notice) => notice.categoryId === categoryId);

export const getNoticesPanelItems = (
  categoryNotices: NoticeWithCategory[],
  activeTab: NoticesTab,
  previewLimit: number,
): NoticeItem[] => {
  const filtered =
    activeTab === "unread"
      ? categoryNotices.filter((notice) => notice.isUnread)
      : categoryNotices;

  return filtered
    .slice(0, previewLimit)
    .map(({ categoryId: _categoryId, ...notice }) => notice);
};

export const countUnreadNotices = (
  notices: NoticeWithCategory[],
): number => notices.filter((notice) => notice.isUnread).length;

export type NoticesPanelDerivedState = {
  items: NoticeItem[];
  selectedCategoryId: string;
  totalCount: number;
  unreadCount: number;
  globalUnreadCount: number;
};

export type DeriveNoticesPanelStateParams = {
  notices: NoticeWithCategory[];
  categories: NoticeCategory[];
  selectedCategoryId: string;
  activeTab: NoticesTab;
  previewLimit?: number | undefined;
  defaultCategoryId?: string | undefined;
  globalUnreadCount?: number | undefined;
};

export const deriveNoticesPanelState = ({
  notices,
  categories,
  selectedCategoryId,
  activeTab,
  previewLimit = DEFAULT_NOTICES_PREVIEW_LIMIT,
  defaultCategoryId,
  globalUnreadCount,
}: DeriveNoticesPanelStateParams): NoticesPanelDerivedState => {
  const resolvedSelectedCategoryId = resolveSelectedCategoryId(
    categories,
    selectedCategoryId,
    defaultCategoryId,
  );
  const categoryNotices = getCategoryNotices(
    notices,
    resolvedSelectedCategoryId,
  );

  return {
    selectedCategoryId: resolvedSelectedCategoryId,
    items: getNoticesPanelItems(categoryNotices, activeTab, previewLimit),
    totalCount: categoryNotices.length,
    unreadCount: countUnreadNotices(categoryNotices),
    globalUnreadCount: globalUnreadCount ?? countUnreadNotices(notices),
  };
};
