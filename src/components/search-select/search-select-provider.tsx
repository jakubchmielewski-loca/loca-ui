import { useCombobox } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";

import { SEARCH_SELECT_DEFAULTS } from "./constants";
import { SearchSelectContext } from "./context";
import type { SearchSelectProviderProps } from "./types";
import { filterItems, flattenOptions, normalizeData } from "./utils";

export const SearchSelectProvider = ({
  children,
  label,
  data,
  searchPlaceholder,
  nothingFoundMessage = SEARCH_SELECT_DEFAULTS.nothingFoundMessage,
  disabled = false,
  maxDropdownHeight = SEARCH_SELECT_DEFAULTS.maxDropdownHeight,
  dropdownWidth = SEARCH_SELECT_DEFAULTS.dropdownWidth,
  triggerProps,
  multiple,
  selectedValues,
  onToggleValue,
}: SearchSelectProviderProps) => {
  const [search, setSearch] = useState("");

  const parsedItems = useMemo(() => normalizeData(data), [data]);
  const options = useMemo(() => flattenOptions(parsedItems), [parsedItems]);

  const combobox = useCombobox({
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
    },
  });

  const filteredItems = useMemo(
    () => filterItems(parsedItems, search),
    [parsedItems, search]
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
      options,
      filteredItems,
      handleOptionSubmit,
      triggerProps,
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
      options,
      filteredItems,
      handleOptionSubmit,
      triggerProps,
    ]
  );

  return (
    <SearchSelectContext.Provider value={value}>
      {children}
    </SearchSelectContext.Provider>
  );
};
