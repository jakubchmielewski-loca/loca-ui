import { Flex, Group, Text } from "@mantine/core";
import { BellRing } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { NoticesPopover } from "./notices-popover";
import { UnreadCountBadge } from "./unread-count-badge";
import { useNotices } from "./use-notices";

export const Notices = () => {
  const { globalUnreadCount, isOpen, toggle } = useNotices();

  return (
    <NoticesPopover>
      <Group
        p={16}
        gap={6}
        align="center"
        onClick={toggle}
        {...(isOpen ? { bg: uiColors.surfaceNavySoft } : {})}
        style={{ cursor: "pointer" }}
      >
        <Group gap={8} align="center">
          <Flex c="navy">
            <BellRing size={16} />
          </Flex>
          <Text fz={14} lh={1} ff="heading">
            Powiadomienia
          </Text>
        </Group>
        <UnreadCountBadge count={globalUnreadCount} />
      </Group>
    </NoticesPopover>
  );
};
