import {
  DatePickerInput,
  type DatePickerInputProps,
  type DatePickerType,
} from "@mantine/dates";
import { Calendar } from "lucide-react";
import type { JSX } from "react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

type SearchDateInputProps<Type extends DatePickerType = "default"> =
  DatePickerInputProps<Type> & {
    bg?: string;
  };

type SearchDateInputComponent = <Type extends DatePickerType = "default">(
  props: SearchDateInputProps<Type>,
) => JSX.Element;

const hasDateValue = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some((item) => item != null && item !== "");
  }
  return value != null && value !== "";
};

const DatePickerInputBase = DatePickerInput as (
  props: DatePickerInputProps,
) => JSX.Element;

export const SearchDateInput = (({
  bg,
  clearable = true,
  valueFormat = "DD.MM.YYYY",
  leftSection,
  ...props
}: SearchDateInputProps) => {
  const backgroundColor =
    bg ?? (hasDateValue(props.value) ? uiColors.surfaceElevated : "white");

  return (
    <DatePickerInputBase
      variant="filled"
      radius="xl"
      clearable={clearable}
      valueFormat={valueFormat}
      styles={{
        input: {
          backgroundColor,
          border: `1px solid ${uiColors.borderSubtle}`,
        },
      }}
      leftSection={leftSection ?? <Calendar size={16} />}
      {...props}
    />
  );
}) as SearchDateInputComponent;
