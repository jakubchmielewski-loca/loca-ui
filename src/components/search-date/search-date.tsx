import { DateInput, type DateInputProps } from "@mantine/dates";
import { Calendar } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

type SearchDateProps = DateInputProps & {
  bg?: string;
};

export const SearchDate = ({
  bg,
  clearable = true,
  valueFormat = "DD.MM.YYYY",
  leftSection,
  value,
  ...props
}: SearchDateProps) => {
  const hasValue = value != null && value !== "";
  const backgroundColor =
    bg ?? (hasValue ? uiColors.surfaceElevated : "white");

  return (
    <DateInput
      variant="filled"
      radius="xl"
      clearable={clearable}
      valueFormat={valueFormat}
      value={value}
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
};
