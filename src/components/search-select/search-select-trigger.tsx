import { ActionIcon, Box, Combobox, Group, Text, UnstyledButton } from "@mantine/core";
import { ChevronDown, X } from "lucide-react";
import type { MouseEvent } from "react";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import { SelectionCountBadge } from "./selection-count-badge";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectTrigger = () => {
  const {
    label,
    disabled,
    clearable,
    multiple,
    selectedValues,
    options,
    combobox,
    onClear,
    triggerProps,
  } = useSearchSelect();

  const {
    style: triggerStyle,
    onClick: triggerOnClick,
    ...restTriggerProps
  } = triggerProps ?? {};

  const selectedCount = selectedValues.length;
  const hasSelection = selectedCount > 0;
  const showClear = clearable && hasSelection && !disabled;

  const selectedLabel =
    !multiple && hasSelection
      ? (options.find((option) => option.value === selectedValues[0])?.label ??
        selectedValues[0])
      : null;

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClear();
  };

  return (
    <Combobox.Target>
      <UnstyledButton
        type="button"
        ps={24}
        pe={20}
        py={12}
        h={48}
        bg={
          disabled
            ? uiColors.surfaceElevated
            : hasSelection
              ? uiColors.surfaceElevated
              : "white"
        }
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
            opacity: disabled ? 0.55 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
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
                c={disabled ? uiColors.textMuted : uiColors.textStrong}
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
                  c={disabled ? uiColors.textMuted : uiColors.textStrong}
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
          <Group gap={4} wrap="nowrap" align="center" style={{ flexShrink: 0 }}>
            {showClear ? (
              <ActionIcon
                component="span"
                role="button"
                variant="transparent"
                size={16}
                c={uiColors.primaryAccent}
                aria-label="Wyczyść wybór"
                onClick={handleClear}
                onMouseDown={(event) => {
                  // Prevent Combobox.Target from treating this as a toggle.
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <X size={14} strokeWidth={2.5} />
              </ActionIcon>
            ) : null}
            <ChevronDown
              size={16}
              color={disabled ? uiColors.textMuted : uiColors.primaryAccent}
              style={{ flexShrink: 0 }}
            />
          </Group>
        </Group>
      </UnstyledButton>
    </Combobox.Target>
  );
};
