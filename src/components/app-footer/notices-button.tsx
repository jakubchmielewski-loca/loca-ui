import { Button, Flex, Group, Text } from "@mantine/core";
import { BellRing } from "lucide-react";
import { UnreadCountBadge } from "../notices/unread-count-badge";
import { useNotices } from "../notices/use-notices";

export const AppFooterNoticesButton = () => {
  const { unreadCount, openDrawer } = useNotices();

  return (
    <Button
      justify="flex-start"
      variant="subtle"
      px={16}
      py={12}
      radius="xl"
      fullWidth
      onClick={openDrawer}
    >
      <Group gap={8} align="center">
        <Flex c="navy">
          <BellRing size={16} />
        </Flex>
        <Text fz={14} lh={1} ff="heading">
          Powiadomienia
        </Text>
        <UnreadCountBadge count={unreadCount} />
      </Group>
    </Button>
  );
};
