import { Combobox } from "@mantine/core";

import {
  ComboboxDropdown,
  ComboboxDropdownOptions,
  ComboboxDropdownSearch,
} from "../combobox-dropdown";
import { SearchSelectOptionItem } from "./search-select-option-item";
import { useSearchSelect } from "./use-search-select";
import { flattenOptions, isOptionGroup } from "./utils";

export const SearchSelectDropdown = () => {
  const {
    combobox,
    search,
    setSearch,
    searchPlaceholder,
    filteredItems,
    nothingFoundMessage,
    maxDropdownHeight,
  } = useSearchSelect();

  const isEmpty = flattenOptions(filteredItems).length === 0;

  return (
    <ComboboxDropdown>
      <ComboboxDropdownSearch
        combobox={combobox}
        value={search}
        onChange={setSearch}
        placeholder={searchPlaceholder}
      />
      <ComboboxDropdownOptions
        maxHeight={maxDropdownHeight}
        emptyMessage={nothingFoundMessage}
        isEmpty={isEmpty}
      >
        {filteredItems.map((item) => {
          if (isOptionGroup(item)) {
            return (
              <Combobox.Group label={item.group} key={item.group}>
                {item.items.map((option) => (
                  <SearchSelectOptionItem key={option.value} option={option} />
                ))}
              </Combobox.Group>
            );
          }

          return <SearchSelectOptionItem key={item.value} option={item} />;
        })}
      </ComboboxDropdownOptions>
    </ComboboxDropdown>
  );
};
