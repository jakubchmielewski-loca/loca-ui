import { Checkbox, Combobox, Group, Text } from "@mantine/core";
import { Check } from "lucide-react";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import type { SearchSelectOption } from "./types";
import { useSearchSelect } from "./use-search-select";

type SearchSelectOptionItemProps = {
  option: SearchSelectOption;
};

export const SearchSelectOptionItem = ({
  option,
}: SearchSelectOptionItemProps) => {
  const { multiple, selectedValues } = useSearchSelect();
  const isSelected = selectedValues.includes(option.value);

  return (
    <Combobox.Option
      value={option.value}
      {...(option.disabled ? { disabled: true } : {})}
      active={isSelected}
    >
      <Group wrap="nowrap" gap={8} w="100%">
        {multiple ? (
          <Checkbox
            size="xs"
            checked={isSelected}
            readOnly
            tabIndex={-1}
            aria-hidden
            styles={{
              input: {
                borderColor: uiColors.primaryAccent,
                borderRadius: 2,
                cursor: "pointer",
              },
            }}
          />
        ) : null}
        <Text fz={16} fw={400} c={uiColors.textStrong} style={{ flex: 1 }}>
          {option.label}
        </Text>
        {!multiple && isSelected ? (
          <Check size={14} strokeWidth={2.5} color={uiColors.primaryAccent} />
        ) : null}
      </Group>
    </Combobox.Option>
  );
};
