import type { ComboboxStore, UnstyledButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

export type SearchSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SearchSelectOptionGroup = {
  group: string;
  items: (string | SearchSelectOption)[];
};

export type SearchSelectDataItem =
  | string
  | SearchSelectOption
  | SearchSelectOptionGroup;

export type SearchSelectData = SearchSelectDataItem[];

export type SearchSelectNormalizedGroup = {
  group: string;
  items: SearchSelectOption[];
};

export type SearchSelectParsedItem =
  | SearchSelectOption
  | SearchSelectNormalizedGroup;

export type SearchSelectTriggerProps = UnstyledButtonProps &
  ComponentPropsWithoutRef<"button">;

export type SearchSelectBaseProps = {
  label: string;
  data: SearchSelectData;
  /** Whether to show the search input in the dropdown. Defaults to true. */
  searchField?: boolean;
  searchPlaceholder?: string;
  nothingFoundMessage?: string;
  disabled?: boolean;
  /** Whether to show a clear (X) control when a value is selected. Defaults to true. */
  clearable?: boolean;
  maxDropdownHeight?: number | string;
  /** Dropdown width in px; wider than the trigger button by default */
  dropdownWidth?: number;
  /** Props forwarded to the trigger button (e.g. miw, maw, w, style) */
  triggerProps?: SearchSelectTriggerProps;
};

export type SearchSelectProps =
  | (SearchSelectBaseProps & {
      multiple?: false;
      value?: string | null;
      defaultValue?: string | null;
      onChange?: (value: string | null) => void;
    })
  | (SearchSelectBaseProps & {
      multiple: true;
      value?: string[];
      defaultValue?: string[];
      onChange?: (value: string[]) => void;
    });

export type SearchSelectContextValue = {
  label: string;
  searchField: boolean;
  searchPlaceholder: string;
  nothingFoundMessage: string;
  disabled: boolean;
  clearable: boolean;
  maxDropdownHeight: number | string;
  dropdownWidth: number;
  multiple: boolean;
  selectedValues: string[];
  onToggleValue: (value: string) => void;
  onClear: () => void;
  combobox: ComboboxStore;
  search: string;
  setSearch: (value: string) => void;
  options: SearchSelectOption[];
  filteredItems: SearchSelectParsedItem[];
  handleOptionSubmit: (value: string) => void;
  triggerProps?: SearchSelectTriggerProps;
};

export type SearchSelectProviderProps = SearchSelectBaseProps & {
  children: React.ReactNode;
  multiple: boolean;
  selectedValues: string[];
  onToggleValue: (value: string) => void;
  onClear: () => void;
};
