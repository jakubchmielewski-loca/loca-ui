import { Group, Text, UnstyledButton } from "@mantine/core";
import { MoveRight } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { useNotices } from "./use-notices";

export const NoticesListFooter = () => {
  const { onViewAll, close } = useNotices();

  return (
    <UnstyledButton
      onClick={() => {
        onViewAll();
        close();
      }}
      w="100%"
      py={16}
      mt="auto"
      aria-label="Zobacz wszystkie powiadomienia"
      style={{ borderTop: `2px solid ${uiColors.borderSubtle}` }}
    >
      <Group justify="center" gap={8} wrap="nowrap">
        <Text fz={14} fw={600} c={uiColors.primaryAccent}>
          Zobacz wszystkie
        </Text>
        <MoveRight size={16} color={uiColors.primaryAccent} />
      </Group>
    </UnstyledButton>
  );
};
