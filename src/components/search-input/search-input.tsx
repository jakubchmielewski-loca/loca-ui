import { CloseButton, TextInput, type TextInputProps } from "@mantine/core";
import { Search } from "lucide-react";

type SearchInputProps = Omit<TextInputProps, "value"> & {
  value: string;
};

export const SearchInput = ({
  onChange,
  value,
  rightSection,
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
