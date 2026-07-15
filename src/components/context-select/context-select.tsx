import { Combobox, Group, Stack, Text, UnstyledButton, useCombobox } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ComboboxDropdown,
  ComboboxDropdownOptions,
  ComboboxDropdownSearch,
} from "../combobox-dropdown";
import { fontFamilyHeadings, uiColors } from "../loca-ui-provider/theme-tokens";

export type ContextSelectOption = {
  key: string;
  title: string;
  subtitle: string;
};

export type ContextSelectProps = {
  options: ContextSelectOption[];
  value: string;
  onChange: (key: string, option: ContextSelectOption) => void;
  disabled?: boolean;
  changeLabel?: string;
  searchPlaceholder?: string;
  nothingFoundMessage?: string;
  maxDropdownHeight?: number | string;
};

const getSearchableText = (option: ContextSelectOption) =>
  `${option.title} ${option.subtitle}`.toLowerCase();

const filterOptions = (options: ContextSelectOption[], search: string) => {
  const query = search.trim().toLowerCase();
  if (!query) {
    return options;
  }

  return options.filter((option) => getSearchableText(option).includes(query));
};

type OptionContentProps = {
  title: string;
  subtitle: string;
};

const TriggerContent = ({ title, subtitle }: OptionContentProps) => (
  <Stack gap={2} style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
    <Text
      fz={16}
      fw={600}
      lh={1.2}
      c={uiColors.textStrong}
      ff={fontFamilyHeadings}
      truncate
    >
      {title}
    </Text>
    <Text
      fz={10}
      fw={400}
      lh={1.2}
      c={uiColors.textSecondary}
      tt="uppercase"
      ff="heading"
      truncate
    >
      {subtitle}
    </Text>
  </Stack>
);

const DropdownOptionContent = ({ title, subtitle }: OptionContentProps) => (
  <Stack gap={2} style={{ flex: 1, minWidth: 0, textAlign: "left" }} py={4}>
    <Text fz={16} fw={600} lh={1.2} ff={fontFamilyHeadings} truncate>
      {title}
    </Text>
    <Text fz={10} fw={400} lh={1.2} tt="uppercase" ff="heading" truncate>
      {subtitle}
    </Text>
  </Stack>
);

export const ContextSelect = ({
  options,
  value,
  onChange,
  disabled = false,
  changeLabel = "Zmień",
  searchPlaceholder = "Szukaj...",
  nothingFoundMessage = "Brak wyników",
  maxDropdownHeight = 280,
}: ContextSelectProps) => {
  const [search, setSearch] = useState("");

  const optionsByKey = useMemo(
    () =>
      options.reduce<Record<string, ContextSelectOption>>((acc, option) => {
        acc[option.key] = option;
        return acc;
      }, {}),
    [options]
  );

  const selectedOption = optionsByKey[value] ?? null;

  const combobox = useCombobox({
    onDropdownOpen: () => {
      combobox.focusSearchInput();
      if (value) {
        setTimeout(() => {
          combobox.selectActiveOption();
        }, 0);
      }
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

  const handleOptionSubmit = (optionKey: string) => {
    const option = optionsByKey[optionKey];
    if (option) {
      onChange(optionKey, option);
    }
    combobox.closeDropdown();
  };

  const dropdownOptions = filteredOptions.map((option) => (
    <Combobox.Option
      key={option.key}
      value={option.key}
      active={option.key === value}
    >
      <DropdownOptionContent title={option.title} subtitle={option.subtitle} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleOptionSubmit}
      __staticSelector="ContextSelect"
    >
      <Combobox.Target>
        <UnstyledButton
          type="button"
          disabled={disabled}
          onClick={() => combobox.toggleDropdown()}
          w="100%"
          px={16}
          py={12}
          bg="var(--input-bg)"
          style={{
            border: `1px solid ${uiColors.borderSubtle}`,
            borderRadius: 12,
          }}
        >
          <Group
            justify="space-between"
            wrap="nowrap"
            align="center"
            gap={8}
            w="100%"
          >
            {selectedOption ? (
              <TriggerContent
                title={selectedOption.title}
                subtitle={selectedOption.subtitle}
              />
            ) : (
              <Text fz={16} c={uiColors.textMuted}>
                Wybierz kontekst
              </Text>
            )}
            <Group gap={6} wrap="nowrap" style={{ flexShrink: 0 }}>
              <Text fz={14} c={uiColors.textPrimary} ff="heading">
                {changeLabel}
              </Text>
              <ChevronDown size={16} color="navy" />
            </Group>
          </Group>
        </UnstyledButton>
      </Combobox.Target>

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
          isEmpty={dropdownOptions.length === 0}
        >
          {dropdownOptions}
        </ComboboxDropdownOptions>
      </ComboboxDropdown>
    </Combobox>
  );
};
