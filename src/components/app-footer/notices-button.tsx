import { Button, Flex, Group, Text, useMatches } from "@mantine/core";
import { BellRing } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { NoticesPopover } from "../notices/notices-popover";
import { UnreadCountBadge } from "../notices/unread-count-badge";
import { useNotices } from "../notices/use-notices";

export const AppFooterNoticesButton = () => {
  const isDesktop = useMatches({
    base: false,
    sm: true,
  });
  const { globalUnreadCount, isOpen, toggle, onViewAll } = useNotices();

  const onClick = () => {
    if (isDesktop) {
      toggle();
    } else {
      onViewAll();
    }
  };

  return (
    <NoticesPopover>
      <Button
        justify="flex-start"
        variant="subtle"
        px={16}
        py={12}
        radius="xl"
        fullWidth
        onClick={onClick}
        {...(isOpen ? { bg: uiColors.surfaceNavySoft } : {})}
      >
        <Group gap={8} align="center">
          <Flex c="navy">
            <BellRing size={16} />
          </Flex>
          <Text fz={14} lh={1} ff="heading">
            Powiadomienia
          </Text>
          <UnreadCountBadge count={globalUnreadCount} />
        </Group>
      </Button>
    </NoticesPopover>
  );
};
