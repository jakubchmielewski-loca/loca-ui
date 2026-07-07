import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import { CheckCheck } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

export type NoticesMarkAllBarProps = {
  unreadCount: number;
  onMarkAllAsRead: () => void;
};

export const NoticesMarkAllBar = ({
  unreadCount,
  onMarkAllAsRead,
}: NoticesMarkAllBarProps) => {
  if (unreadCount === 0) return null;

  return (
    <Box pt={8}>
      <UnstyledButton
        onClick={onMarkAllAsRead}
        w="100%"
        py={12}
        bd={`1px solid ${uiColors.borderSubtle}`}
        bdrs={4}
        aria-label="Oznacz wszystkie jako przeczytane"
      >
        <Group justify="center" gap={8} wrap="nowrap">
          <CheckCheck size={16} color={uiColors.primaryAccent} />
          <Text fz={12} fw={400} c={uiColors.textStrong}>
            Oznacz wszystkie jako przeczytane ({unreadCount})
          </Text>
        </Group>
      </UnstyledButton>
    </Box>
  );
};
