import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { Check } from "lucide-react";
import dayjs from "dayjs";
import type { MouseEvent } from "react";
import type { NoticeItem } from "./types";

export type NoticeProps = {
  notice: NoticeItem;
  onMarkAsRead?: ((id: NoticeItem["id"]) => void) | undefined;
  onClick?: ((notice: NoticeItem) => void) | undefined;
};

const getBadgeColor = (source?: NoticeItem["source"] | null) => {
  switch (source) {
    case "KAR_ADMIN":
      return "green";
    case "KD_ADMIN":
      return "blue";
    case "RCP_ADMIN":
      return "purple";
    case "RCP_PRACOWNIK":
      return "orange";
    case "ESW_ADMIN":
      return "red";
    case "KRT":
      return "yellow";
    case "KRT_OPS":
      return "pink";
    case "SRV":
      return "green";
    case "SRV_OPS":
      return "blue";
    default:
      return "gray";
  }
};

export const Notice = ({ notice, onMarkAsRead, onClick }: NoticeProps) => {
  const { isUnread, source, title, message, createdAt } = notice;
  const badgeColor = getBadgeColor(source);

  const handleClick = () => {
    onClick?.(notice);
  };

  const handleMarkAsRead = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onMarkAsRead?.(notice.id);
  };

  return (
    <Paper
      withBorder
      p="sm"
      onClick={onClick ? handleClick : undefined}
      opacity={isUnread ? 1 : 0.55}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Stack gap={6}>
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Group gap={8} wrap="nowrap">
            <Badge color={badgeColor} variant="light" size="sm">
              {source}
            </Badge>
            <Text
              fw={isUnread ? 600 : 400}
              size="sm"
              {...(isUnread ? {} : { c: "dimmed" })}
            >
              {title}
            </Text>
          </Group>
          {isUnread && onMarkAsRead ? (
            <Tooltip label="Oznacz jako przeczytane">
              <ActionIcon
                variant="subtle"
                size="sm"
                color="gray"
                onClick={handleMarkAsRead}
                aria-label="Oznacz jako przeczytane"
              >
                <Check size={14} />
              </ActionIcon>
            </Tooltip>
          ) : null}
        </Group>
        <Box>
          <Text size="sm" c="dimmed">
            {message}
          </Text>
        </Box>
        <Text size="xs" c="dimmed">
          {dayjs(createdAt).format("DD MMM YYYY, HH:mm")}
        </Text>
      </Stack>
    </Paper>
  );
};
