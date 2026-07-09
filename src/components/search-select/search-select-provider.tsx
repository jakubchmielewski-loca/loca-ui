import { useCombobox } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";

import { SEARCH_SELECT_DEFAULTS } from "./constants";
import { SearchSelectContext } from "./context";
import type { SearchSelectProviderProps } from "./types";
import { filterOptions, normalizeData } from "./utils";

export const SearchSelectProvider = ({
  children,
  label,
  data,
  searchPlaceholder,
  nothingFoundMessage = SEARCH_SELECT_DEFAULTS.nothingFoundMessage,
  disabled = false,
  maxDropdownHeight = SEARCH_SELECT_DEFAULTS.maxDropdownHeight,
  dropdownWidth = SEARCH_SELECT_DEFAULTS.dropdownWidth,
  multiple,
  selectedValues,
  onToggleValue,
}: SearchSelectProviderProps) => {
  const [search, setSearch] = useState("");

  const options = useMemo(() => normalizeData(data), [data]);

  const combobox = useCombobox({
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
    },
  });

  const filteredOptions = useMemo(
    () => filterOptions(options, search),
    [options, search]
  );

  const handleOptionSubmit = useCallback(
    (optionValue: string) => {
      onToggleValue(optionValue);
      if (!multiple) {
        combobox.closeDropdown();
      }
    },
    [multiple, onToggleValue, combobox]
  );

  const value = useMemo(
    () => ({
      label,
      searchPlaceholder: searchPlaceholder ?? SEARCH_SELECT_DEFAULTS.searchPlaceholder,
      nothingFoundMessage,
      disabled,
      maxDropdownHeight,
      dropdownWidth,
      multiple,
      selectedValues,
      onToggleValue,
      combobox,
      search,
      setSearch,
      filteredOptions,
      handleOptionSubmit,
    }),
    [
      label,
      searchPlaceholder,
      nothingFoundMessage,
      disabled,
      maxDropdownHeight,
      dropdownWidth,
      multiple,
      selectedValues,
      onToggleValue,
      combobox,
      search,
      filteredOptions,
      handleOptionSubmit,
    ]
  );

  return (
    <SearchSelectContext.Provider value={value}>
      {children}
    </SearchSelectContext.Provider>
  );
};
