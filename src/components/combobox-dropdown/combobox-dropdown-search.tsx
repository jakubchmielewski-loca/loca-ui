import { Combobox, TextInput, type ComboboxStore } from "@mantine/core";
import { Search } from "lucide-react";

import { uiColors } from "../loca-ui-provider/theme-tokens";

type ComboboxDropdownSearchProps = {
  combobox: ComboboxStore;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const ComboboxDropdownSearch = ({
  combobox,
  value,
  onChange,
  placeholder = "Szukaj",
}: ComboboxDropdownSearchProps) => (
  <Combobox.EventsTarget>
    <TextInput
      ref={combobox.searchRef}
      variant="default"
      radius="xl"
      placeholder={placeholder}
      value={value}
      leftSection={<Search size={16} color={uiColors.primaryAccent} />}
      leftSectionPointerEvents="none"
      onChange={(event) => {
        onChange(event.currentTarget.value);
        combobox.updateSelectedOptionIndex("active", {
          scrollIntoView: true,
        });
      }}
      mb="sm"
      styles={{
        input: {
          height: 48,
          border: `2px solid ${uiColors.primaryAccent}`,
          backgroundColor: uiColors.surfaceElevated,
        },
      }}
    />
  </Combobox.EventsTarget>
);
