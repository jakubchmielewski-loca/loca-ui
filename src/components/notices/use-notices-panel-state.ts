"use client";

import { useMemo, useState } from "react";

import {
  DEFAULT_NOTICES_PREVIEW_LIMIT,
  deriveNoticesPanelState,
} from "./notices-panel-state";
import type { NoticeCategory, NoticeWithCategory, NoticesTab } from "./types";

export type UseNoticesPanelStateOptions = {
  notices: NoticeWithCategory[];
  categories: NoticeCategory[];
  defaultCategoryId?: string | undefined;
  previewLimit?: number | undefined;
  globalUnreadCount?: number | undefined;
};

export const useNoticesPanelState = ({
  notices,
  categories,
  defaultCategoryId,
  previewLimit = DEFAULT_NOTICES_PREVIEW_LIMIT,
  globalUnreadCount,
}: UseNoticesPanelStateOptions) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    defaultCategoryId ?? categories[0]?.id ?? "",
  );
  const [activeTab, setActiveTab] = useState<NoticesTab>("all");

  const derivedState = useMemo(
    () =>
      deriveNoticesPanelState({
        notices,
        categories,
        selectedCategoryId,
        activeTab,
        previewLimit,
        defaultCategoryId,
        globalUnreadCount,
      }),
    [
      activeTab,
      categories,
      defaultCategoryId,
      globalUnreadCount,
      notices,
      previewLimit,
      selectedCategoryId,
    ],
  );

  return {
    ...derivedState,
    categories,
    onCategoryChange: setSelectedCategoryId,
    activeTab,
    onTabChange: setActiveTab,
  };
};
