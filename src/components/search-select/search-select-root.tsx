import { Combobox } from "@mantine/core";

import { SEARCH_SELECT_DEFAULTS } from "./constants";
import { SearchSelectDropdown } from "./search-select-dropdown";
import { SearchSelectTrigger } from "./search-select-trigger";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectRoot = () => {
  const { combobox, dropdownWidth, handleOptionSubmit } = useSearchSelect();

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleOptionSubmit}
      width={dropdownWidth}
      position="bottom-start"
      dropdownPadding={SEARCH_SELECT_DEFAULTS.dropdownPadding}
      __staticSelector="SearchSelect"
    >
      <SearchSelectTrigger />
      <SearchSelectDropdown />
    </Combobox>
  );
};
