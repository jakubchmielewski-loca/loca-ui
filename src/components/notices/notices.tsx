import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Drawer,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Bell } from "lucide-react";
import { Notice } from "./notice";
import { useNoticesContext } from "./notices-context";

export const Notices = () => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const ctx = useNoticesContext();

  if (!ctx) return null;

  const {
    items,
    unreadCount,
    isLoading,
    error,
    onMarkAsRead,
    onMarkAllAsRead,
    onNoticeClick,
    emptyLabel,
  } = ctx;
  const computedUnreadCount =
    unreadCount ?? items.filter((item) => item.isUnread).length;
  const accent = theme.other["uiColors"].primaryAccent;

  return (
    <>
      <Box pos="relative">
        <ActionIcon
          variant="subtle"
          size={48}
          h={67}
          radius={`0 8px 0 0`}
          onClick={open}
          aria-label="Powiadomienia"
        >
          <Bell size={18} color={accent} />
        </ActionIcon>
        {computedUnreadCount > 0 ? (
          <Badge
            color="red"
            size="xs"
            pos="absolute"
            top={10}
            right={6}
            style={{ pointerEvents: "none" }}
          >
            {computedUnreadCount}
          </Badge>
        ) : null}
      </Box>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title="Powiadomienia"
      >
        {isLoading ? (
          <Text size="sm" c="dimmed">
            Ładowanie...
          </Text>
        ) : error ? (
          <Text size="sm" c="red">
            {error}
          </Text>
        ) : items.length === 0 ? (
          <Text size="sm" c="dimmed">
            {emptyLabel ?? "Brak powiadomień"}
          </Text>
        ) : (
          <Stack>
            {onMarkAllAsRead && computedUnreadCount > 0 ? (
              <Group justify="flex-end">
                <Button
                  variant="light"
                  size="compact-sm"
                  onClick={onMarkAllAsRead}
                >
                  Oznacz wszystkie jako przeczytane
                </Button>
              </Group>
            ) : null}
            {items.map((notice) => (
              <Notice
                key={notice.id}
                notice={notice}
                onMarkAsRead={onMarkAsRead}
                onClick={onNoticeClick}
              />
            ))}
          </Stack>
        )}
      </Drawer>
    </>
  );
};
