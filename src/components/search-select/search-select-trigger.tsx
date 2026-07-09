import { Combobox, Group, Text, UnstyledButton } from "@mantine/core";
import { ChevronDown } from "lucide-react";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import { SelectionCountBadge } from "./selection-count-badge";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectTrigger = () => {
  const { label, disabled, multiple, selectedValues, combobox } =
    useSearchSelect();

  const selectedCount = selectedValues.length;
  const hasSelection = selectedCount > 0;

  return (
    <Combobox.Target>
      <UnstyledButton
        type="button"
        disabled={disabled}
        onClick={() => combobox.toggleDropdown()}
        ps={24}
        pe={20}
        py={12}
        h={48}
        bg={hasSelection ? uiColors.surfaceElevated : "white"}
        style={{
          border: `1px solid ${uiColors.borderSubtle}`,
          borderRadius: 999,
        }}
      >
        <Group gap={4} wrap="nowrap" align="center">
          <Text fz={12} fw={600} c={uiColors.textStrong} h={16}>
            {label}
          </Text>
          {multiple ? <SelectionCountBadge count={selectedCount} /> : null}
          <ChevronDown size={16} color={uiColors.primaryAccent} />
        </Group>
      </UnstyledButton>
    </Combobox.Target>
  );
};
