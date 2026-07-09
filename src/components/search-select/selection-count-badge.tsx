import { Center, Group, Text } from "@mantine/core";

import { uiColors } from "../loca-ui-provider/theme-tokens";

export type SelectionCountBadgeProps = {
  count: number;
};

export const SelectionCountBadge = ({ count }: SelectionCountBadgeProps) => {
  if (count === 0) {
    return null;
  }

  return (
    <Center bg={uiColors.primaryAccent} w={27} h={20} bdrs="xl">
      <Text lh="12px" fz={11} fw={600} c="white">
        {count}
      </Text>
    </Center>
  );
};
