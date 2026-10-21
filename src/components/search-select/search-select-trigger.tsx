import { Box, Combobox, Group, Text, UnstyledButton } from "@mantine/core";
import { ChevronDown } from "lucide-react";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import { SelectionCountBadge } from "./selection-count-badge";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectTrigger = () => {
  const {
    label,
    disabled,
    multiple,
    selectedValues,
    options,
    combobox,
    triggerProps,
  } = useSearchSelect();

  const {
    style: triggerStyle,
    onClick: triggerOnClick,
    ...restTriggerProps
  } = triggerProps ?? {};

  const selectedCount = selectedValues.length;
  const hasSelection = selectedCount > 0;

  const selectedLabel =
    !multiple && hasSelection
      ? (options.find((option) => option.value === selectedValues[0])?.label ??
        selectedValues[0])
      : null;

  return (
    <Combobox.Target>
      <UnstyledButton
        type="button"
        ps={24}
        pe={20}
        py={12}
        h={48}
        bg={hasSelection ? uiColors.surfaceElevated : "white"}
        {...restTriggerProps}
        disabled={disabled}
        onClick={(event) => {
          triggerOnClick?.(event);
          if (!event.defaultPrevented) {
            combobox.toggleDropdown();
          }
        }}
        style={[
          {
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            border: `1px solid ${uiColors.borderSubtle}`,
            borderRadius: 999,
          },
          triggerStyle,
        ]}
      >
        <Group
          gap={4}
          wrap="nowrap"
          align="center"
          justify="space-between"
          w="100%"
        >
          <Group
            gap={4}
            wrap="nowrap"
            align="center"
            style={{ minWidth: 0, flex: 1, overflow: "hidden" }}
          >
            <Box
              pos="relative"
              style={{
                minWidth: 0,
                // Single: fill available width so selection can ellipsize.
                // Multiple: keep label+badge clustered (no flex grow).
                ...(!multiple ? { flex: 1 } : undefined),
              }}
            >
              <Text
                fz={12}
                fw={600}
                c={uiColors.textStrong}
                h={16}
                style={{
                  visibility: selectedLabel ? "hidden" : undefined,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Text>
              {selectedLabel ? (
                <Text
                  fz={12}
                  fw={600}
                  c={uiColors.textStrong}
                  h={16}
                  truncate
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                >
                  {selectedLabel}
                </Text>
              ) : null}
            </Box>
            {multiple ? <SelectionCountBadge count={selectedCount} /> : null}
          </Group>
          <ChevronDown
            size={16}
            color={uiColors.primaryAccent}
            style={{ flexShrink: 0 }}
          />
        </Group>
      </UnstyledButton>
    </Combobox.Target>
  );
};
