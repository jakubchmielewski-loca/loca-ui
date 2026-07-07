import { Box, Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { NoticesCategoryBar } from "./notices-category-bar";
import { NoticesFilterTabs } from "./notices-filter-tabs";
import { NoticesList } from "./notices-list";
import { NoticesListFooter } from "./notices-list-footer";
import { NoticesMarkAllBar } from "./notices-mark-all-bar";
import { NoticesPanelHeader } from "./notices-panel-header";
import { useNotices } from "./use-notices";

export const NoticesPanel = () => {
  const {
    items,
    categories,
    selectedCategoryId,
    onCategoryChange,
    activeTab,
    onTabChange,
    totalCount,
    unreadCount,
    isLoading,
    error,
    onMarkAsRead,
    onMarkAllAsRead,
    onDelete,
    onNoticeClick,
    emptyLabel,
  } = useNotices();

  return (
    <Stack gap={0}>
      <NoticesPanelHeader />
      <Divider />
      <NoticesCategoryBar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={onCategoryChange}
      />
      <Divider />
      <NoticesFilterTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        totalCount={totalCount}
        unreadCount={unreadCount}
      />
      <ScrollArea.Autosize h={436}>
        <Stack px={8} gap={16}>
          {onMarkAllAsRead ? (
            <NoticesMarkAllBar
              unreadCount={unreadCount}
              onMarkAllAsRead={onMarkAllAsRead}
            />
          ) : null}
          {isLoading ? (
            <Text size="sm" c="dimmed" px={24} py={16}>
              Ładowanie...
            </Text>
          ) : error ? (
            <Text size="sm" c="red" px={24} py={16}>
              {error}
            </Text>
          ) : (
            <NoticesList
              items={items}
              emptyLabel={emptyLabel ?? "Brak powiadomień"}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
              {...(onNoticeClick !== undefined ? { onNoticeClick } : {})}
            />
          )}
        </Stack>
      </ScrollArea.Autosize>
      <NoticesListFooter />
    </Stack>
  );
};
