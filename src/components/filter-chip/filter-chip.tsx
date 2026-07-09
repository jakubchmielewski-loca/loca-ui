import { ActionIcon, Flex, Group, Text } from "@mantine/core";
import { X } from "lucide-react";

import { uiColors } from "../loca-ui-provider/theme-tokens";

export type FilterChipProps = {
  children: React.ReactNode;
  onRemove: () => void;
};

export const FilterChip = ({ children, onRemove }: FilterChipProps) => (
  <Group
    gap={2}
    wrap="nowrap"
    align="center"
    ps={12}
    pe={10}
    py={8}
    bg={uiColors.lightGray}
    style={{
      border: `1px solid ${uiColors.borderSubtle}`,
      borderRadius: 6,
    }}
  >
    <Text h={16} fz={12} fw={600} c={uiColors.textStrong}>
      {children}
    </Text>
    <ActionIcon
      c={uiColors.primaryAccent}
      variant="transparent"
      size="xs"
      onClick={onRemove}
    >
      <X size={12} strokeWidth={2.5} />
    </ActionIcon>
  </Group>
);
