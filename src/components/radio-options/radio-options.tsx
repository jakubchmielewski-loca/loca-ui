import { Button, Group, Text, ThemeIcon } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { uiColors } from "../loca-ui-provider/theme-tokens";

export type RadioOptionItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type RadioOptionsProps = {
  options: RadioOptionItem[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  disabled?: boolean;
  gap?: number | string;
};

const OPTION_HEIGHT = 48;
const INDICATOR_SIZE = 16;

export const RadioOptions = ({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  gap = 8,
}: RadioOptionsProps) => {
  const [_value, setValue] = useUncontrolled<string | null>({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    finalValue: options[0]?.value ?? null,
  });

  const handleChange = (nextValue: string, optionDisabled?: boolean) => {
    if (disabled || optionDisabled || nextValue === _value) {
      return;
    }

    setValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <Group gap={gap} wrap="wrap" role="radiogroup">
      {options.map((option) => {
        const isSelected = option.value === _value;
        const isDisabled = disabled || option.disabled === true;

        return (
          <Button
            key={option.value}
            type="button"
            variant="default"
            size="compact-md"
            onClick={() => handleChange(option.value, option.disabled)}
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            py={12}
            px={16}
            leftSection={
              <ThemeIcon
                size={INDICATOR_SIZE}
                radius="xl"
                variant={isSelected ? "filled" : "transparent"}
                c={isSelected ? "white" : uiColors.borderSubtle}
                bg={isSelected ? uiColors.primaryAccent : "transparent"}
                style={{
                  border: `1px solid ${uiColors.primaryAccent}`,
                }}
              >
                {isSelected ? <Check size={10} strokeWidth={3} /> : null}
              </ThemeIcon>
            }
            style={{
              height: OPTION_HEIGHT,
              border: `1px solid ${uiColors.borderSubtle}`,
              backgroundColor: isSelected ? uiColors.surfaceNavySoft : "white",
              color: isSelected ? uiColors.primaryAccent : uiColors.textPrimary,
              opacity: isDisabled ? 0.55 : 1,
              transition:
                "background-color 120ms ease, border-color 120ms ease",
            }}
          >
            <Text fz={14} fw={isSelected ? 600 : 400}>
              {option.label}
            </Text>
          </Button>
        );
      })}
    </Group>
  );
};
