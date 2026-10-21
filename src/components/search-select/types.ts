import type { ComboboxStore, UnstyledButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

export type SearchSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SearchSelectTriggerProps = UnstyledButtonProps &
  ComponentPropsWithoutRef<"button">;

export type SearchSelectBaseProps = {
  label: string;
  data: (string | SearchSelectOption)[];
  searchPlaceholder?: string;
  nothingFoundMessage?: string;
  disabled?: boolean;
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
  options: SearchSelectOption[];
  filteredOptions: SearchSelectOption[];
  handleOptionSubmit: (value: string) => void;
  triggerProps?: SearchSelectTriggerProps;
};

export type SearchSelectProviderProps = SearchSelectBaseProps & {
  children: React.ReactNode;
  multiple: boolean;
  selectedValues: string[];
  onToggleValue: (value: string) => void;
};
