import { Button, Drawer, Group, Stack, Text } from "@mantine/core";
import { Notice } from "./notice";
import { useNotices } from "./use-notices";

export const NoticesDrawer = () => {
  const {
    isDrawerOpen,
    closeDrawer,
    items,
    unreadCount,
    isLoading,
    error,
    onMarkAsRead,
    onMarkAllAsRead,
    onNoticeClick,
    emptyLabel,
  } = useNotices();

  return (
    <Drawer
      opened={isDrawerOpen}
      onClose={closeDrawer}
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
          {onMarkAllAsRead && unreadCount > 0 ? (
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
  );
};
