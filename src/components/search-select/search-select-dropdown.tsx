import {
  ComboboxDropdown,
  ComboboxDropdownOptions,
  ComboboxDropdownSearch,
} from "../combobox-dropdown";
import { SearchSelectOptionItem } from "./search-select-option-item";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectDropdown = () => {
  const {
    combobox,
    search,
    setSearch,
    searchPlaceholder,
    filteredOptions,
    nothingFoundMessage,
    maxDropdownHeight,
  } = useSearchSelect();

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
        isEmpty={filteredOptions.length === 0}
      >
        {filteredOptions.map((option) => (
          <SearchSelectOptionItem key={option.value} option={option} />
        ))}
      </ComboboxDropdownOptions>
    </ComboboxDropdown>
  );
};
