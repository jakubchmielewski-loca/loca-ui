import { Stack, Text } from "@mantine/core";
import { Notice } from "./notice";
import type { NoticeItem } from "./types";

export type NoticesListProps = {
  items: NoticeItem[];
  emptyLabel: string;
  onMarkAsRead: (id: NoticeItem["id"]) => void;
  onDelete: (id: NoticeItem["id"]) => void;
  onNoticeClick?: (notice: NoticeItem) => void;
};

export const NoticesList = ({
  items,
  emptyLabel,
  onMarkAsRead,
  onDelete,
  onNoticeClick,
}: NoticesListProps) => {
  if (items.length === 0) {
    return (
      <Text size="sm" c="dimmed" px={24} py={16}>
        {emptyLabel}
      </Text>
    );
  }

  return (
    <Stack gap={0}>
      {items.map((notice, index) => (
        <Notice
          key={notice.id}
          notice={notice}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
          {...(onNoticeClick !== undefined ? { onClick: onNoticeClick } : {})}
          showDivider={index < items.length - 1}
        />
      ))}
    </Stack>
  );
};
