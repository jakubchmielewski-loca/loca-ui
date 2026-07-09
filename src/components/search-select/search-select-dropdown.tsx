import { Combobox } from "@mantine/core";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import { SearchSelectOptionsList } from "./search-select-options-list";
import { SearchSelectSearchInput } from "./search-select-search-input";

export const SearchSelectDropdown = () => (
  <Combobox.Dropdown
    style={{
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 16,
      border: `1px solid ${uiColors.borderSubtle}`,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    }}
  >
    <SearchSelectSearchInput />
    <SearchSelectOptionsList />
  </Combobox.Dropdown>
);
