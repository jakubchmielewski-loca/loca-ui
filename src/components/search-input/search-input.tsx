import { CloseButton, TextInput, type TextInputProps } from "@mantine/core";
import { Search } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

type SearchInputProps = Omit<TextInputProps, "value"> & {
  value: string;
  bg?: string;
};

export const SearchInput = ({
  onChange,
  value,
  rightSection,
  bg = uiColors.searchBg,
  ...props
}: SearchInputProps) => {
  const showClear = !rightSection && value.length > 0;

  const handleClear = () => {
    onChange?.({
      currentTarget: { value: "" },
      target: { value: "" },
    } as never);
  };

  return (
    <TextInput
      variant="filled"
      radius="xl"
      styles={{
        input: {
          backgroundColor: bg,
        },
      }}
      leftSection={<Search size={16} />}
      value={value}
      rightSection={
        showClear ? (
          <CloseButton
            aria-label="Clear search"
            size="sm"
            onClick={handleClear}
          />
        ) : (
          rightSection
        )
      }
      onChange={onChange}
      {...props}
    />
  );
};
