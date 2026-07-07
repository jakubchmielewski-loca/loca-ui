import type { NoticeCategory, NoticeCategoryDefinition, NoticeWithCategory } from "./types";

type BuildNoticeCategoriesOptions = {
  fallbackDefinition?: NoticeCategoryDefinition;
};

export const buildNoticeCategories = (
  notices: NoticeWithCategory[],
  definitions: readonly NoticeCategoryDefinition[],
  options: BuildNoticeCategoriesOptions = {},
): NoticeCategory[] => {
  const fallbackDefinition = options.fallbackDefinition ?? definitions[0];

  if (!fallbackDefinition) {
    return [];
  }

  const activeDefinitions =
    notices.length === 0
      ? [fallbackDefinition]
      : definitions.filter((definition) =>
          notices.some((notice) => notice.categoryId === definition.id),
        );

  return activeDefinitions.map((definition) => ({
    id: definition.id,
    label: definition.label,
    unreadCount: notices.filter(
      (notice) => notice.categoryId === definition.id && notice.isUnread,
    ).length,
  }));
};
