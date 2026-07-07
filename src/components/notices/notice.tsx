import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { Check, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import type { MouseEvent } from "react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import type { NoticeItem } from "./types";

export type NoticeProps = {
  notice: NoticeItem;
  onMarkAsRead: (id: NoticeItem["id"]) => void;
  onDelete: (id: NoticeItem["id"]) => void;
  onClick?: (notice: NoticeItem) => void;
  showDivider?: boolean;
};

export const Notice = ({
  notice,
  onMarkAsRead,
  onDelete,
  onClick,
  showDivider = true,
}: NoticeProps) => {
  const { isUnread, message, createdAt } = notice;

  const handleClick = () => {
    onClick?.(notice);
  };

  const handleMarkAsRead = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onMarkAsRead(notice.id);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(notice.id);
  };

  return (
    <>
      <Box
        ps={12}
        py={16}
        {...(isUnread ? { bg: uiColors.surfaceNavySoft } : {})}
        {...(onClick ? { onClick: handleClick } : {})}
        style={{
          cursor: onClick ? "pointer" : "default",
          ...(isUnread
            ? { borderRight: `4px solid ${uiColors.primaryAccent}` }
            : {}),
        }}
      >
        <Group align="center" wrap="nowrap" gap={16}>
          <Stack gap={12} flex={1} miw={0}>
            <Text fz={12} fw={400} lh={1} opacity={0.5}>
              {dayjs(createdAt).format("HH:mm:ss")}
            </Text>
            <Text fz={12} fw={isUnread ? 600 : 400} lh={1.4}>
              {message}
            </Text>
          </Stack>
          <Stack gap={16} px={16}>
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={handleMarkAsRead}
              c={uiColors.textSecondary}
            >
              <Check size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={handleDelete}
              c={uiColors.textSecondary}
            >
              <Trash2 size={16} />
            </ActionIcon>
          </Stack>
        </Group>
      </Box>
      {showDivider ? <Divider /> : null}
    </>
  );
};
