import type { ComboboxStore } from "@mantine/core";

export type SearchSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SearchSelectBaseProps = {
  label: string;
  data: (string | SearchSelectOption)[];
  searchPlaceholder?: string;
  nothingFoundMessage?: string;
  disabled?: boolean;
  maxDropdownHeight?: number | string;
  /** Dropdown width in px; wider than the trigger button by default */
  dropdownWidth?: number;
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
  searchPlaceholder: string;
  nothingFoundMessage: string;
  disabled: boolean;
  maxDropdownHeight: number | string;
  dropdownWidth: number;
  multiple: boolean;
  selectedValues: string[];
  onToggleValue: (value: string) => void;
  combobox: ComboboxStore;
  search: string;
  setSearch: (value: string) => void;
  filteredOptions: SearchSelectOption[];
  handleOptionSubmit: (value: string) => void;
};

export type SearchSelectProviderProps = SearchSelectBaseProps & {
  children: React.ReactNode;
  multiple: boolean;
  selectedValues: string[];
  onToggleValue: (value: string) => void;
};
