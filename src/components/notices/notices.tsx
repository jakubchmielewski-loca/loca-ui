import { Flex, Group, Text } from "@mantine/core";
import { BellRing } from "lucide-react";
import { UnreadCountBadge } from "./unread-count-badge";
import { useNotices } from "./use-notices";

export const Notices = () => {
  const { unreadCount, openDrawer } = useNotices();

  return (
    <Group p={16} onClick={openDrawer} gap={6} align="center">
      <Group gap={8} align="center">
        <Flex c="navy">
          <BellRing size={16} />
        </Flex>
        <Text fz={14} lh={1} ff="heading">
          Powiadomienia
        </Text>
      </Group>
      <UnreadCountBadge count={unreadCount} />
    </Group>
  );
};
