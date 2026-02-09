import { TextInput, type TextInputProps } from "@mantine/core";
import { Search } from "lucide-react";

export const SearchInput = (props: TextInputProps) => {
  return (
    <TextInput
      variant="filled"
      radius="xl"
      leftSection={<Search size={16} />}
      {...props}
    />
  );
};
