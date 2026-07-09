import { Combobox, TextInput } from "@mantine/core";
import { Search } from "lucide-react";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectSearchInput = () => {
  const { combobox, search, setSearch, searchPlaceholder } = useSearchSelect();

  return (
    <Combobox.EventsTarget>
      <TextInput
        ref={combobox.searchRef}
        variant="default"
        radius="xl"
        placeholder={searchPlaceholder}
        value={search}
        leftSection={<Search size={16} color={uiColors.primaryAccent} />}
        leftSectionPointerEvents="none"
        onChange={(event) => {
          setSearch(event.currentTarget.value);
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
};
