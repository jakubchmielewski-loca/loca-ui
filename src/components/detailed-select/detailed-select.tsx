import {
  Combobox,
  Group,
  Input,
  InputBase,
  ScrollArea,
  Stack,
  Text,
  useCombobox,
  type InputBaseProps,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";

export type DetailedSelectMetadata = {
  /** Optional label prefix, e.g. "Adres" */
  label?: string;
  value: string;
};

export type DetailedSelectOption = {
  value: string;
  label: string;
  /** Secondary line shown below the label and included in search, e.g. address */
  description?: string;
  /** Additional metadata rows; values are included in search */
  metadata?: DetailedSelectMetadata[];
  disabled?: boolean;
};

export type DetailedSelectProps = Omit<
  InputBaseProps,
  "value" | "defaultValue" | "onChange" | "onClick" | "readOnly" | "placeholder"
> & {
  data: DetailedSelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (
    value: string | null,
    option: DetailedSelectOption | null
  ) => void;
  placeholder?: string;
  nothingFoundMessage?: React.ReactNode;
  clearable?: boolean;
  maxDropdownHeight?: number | string;
  name?: string;
  form?: string;
};

const getSearchableText = (option: DetailedSelectOption) => {
  const parts = [option.label];

  if (option.description) {
    parts.push(option.description);
  }

  option.metadata?.forEach((item) => {
    if (item.label) {
      parts.push(item.label);
    }
    parts.push(item.value);
  });

  return parts.join(" ").toLowerCase();
};

const filterOptions = (options: DetailedSelectOption[], search: string) => {
  const query = search.trim().toLowerCase();
  if (!query) {
    return options;
  }

  return options.filter((option) => getSearchableText(option).includes(query));
};

type OptionContentProps = {
  option: DetailedSelectOption;
};

const OptionContent = ({ option }: OptionContentProps) => (
  <Stack gap={2} style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
    <Text size="sm" fw={600} truncate>
      {option.label}
    </Text>
    {option.description ? (
      <Text size="xs" truncate>
        {option.description}
      </Text>
    ) : null}
    {option.metadata?.map((item, index) => (
      <Text key={`${item.label ?? "meta"}-${index}`} size="xs" truncate>
        {item.label ? `${item.label}: ${item.value}` : item.value}
      </Text>
    ))}
  </Stack>
);

export const DetailedSelect = ({
  data,
  value,
  defaultValue,
  onChange,
  nothingFoundMessage = "Brak wyników",
  clearable = false,
  maxDropdownHeight = 280,
  placeholder = "Wybierz opcję",
  disabled,
  name,
  form,
  size = "sm",
  ...inputProps
}: DetailedSelectProps) => {
  const [search, setSearch] = useState("");

  const [_value, setValue] = useUncontrolled<string | null>({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    finalValue: null,
  });

  const optionsByValue = useMemo(
    () =>
      data.reduce<Record<string, DetailedSelectOption>>((acc, option) => {
        acc[option.value] = option;
        return acc;
      }, {}),
    [data]
  );

  const updateValue = (nextValue: string | null) => {
    const option = nextValue != null ? optionsByValue[nextValue] ?? null : null;
    setValue(nextValue);
    onChange?.(nextValue, option);
  };

  const selectedOption = _value != null ? optionsByValue[_value] ?? null : null;

  const combobox = useCombobox({
    onDropdownOpen: () => {
      combobox.focusSearchInput();
      if (_value != null) {
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
    () => filterOptions(data, search),
    [data, search]
  );

  const handleOptionSubmit = (optionValue: string) => {
    updateValue(optionValue);
    combobox.closeDropdown();
  };

  const handleClear = () => {
    updateValue(null);
    combobox.closeDropdown();
  };

  const options = filteredOptions.map((option) => (
    <Combobox.Option
      key={option.value}
      value={option.value}
      {...(option.disabled ? { disabled: true } : {})}
      active={option.value === _value}
    >
      <Group wrap="nowrap" gap="xs" justify="space-between" w="100%">
        <OptionContent option={option} />
        {option.value === _value ? <Check size={14} strokeWidth={2.5} /> : null}
      </Group>
    </Combobox.Option>
  ));

  const showClear = clearable && !!_value && !disabled;

  return (
    <>
      <Combobox
        store={combobox}
        onOptionSubmit={handleOptionSubmit}
        size={size}
        __staticSelector="DetailedSelect"
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            size={size}
            {...(disabled ? { disabled: true } : {})}
            rightSection={<Combobox.Chevron size={size} />}
            rightSectionPointerEvents="none"
            __clearable={showClear}
            __clearSection={
              <Combobox.ClearButton
                onClear={handleClear}
                aria-label="Wyczyść wybór"
              />
            }
            onClick={() => combobox.toggleDropdown()}
            {...inputProps}
          >
            {selectedOption ? (
              selectedOption.label
            ) : (
              <Input.Placeholder>{placeholder}</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            placeholder="Szukaj..."
            value={search}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              combobox.updateSelectedOptionIndex("active", {
                scrollIntoView: true,
              });
            }}
          />
          <Combobox.Options>
            <ScrollArea.Autosize mah={maxDropdownHeight} type="scroll">
              {options.length > 0 ? (
                options
              ) : (
                <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Combobox.HiddenInput
        value={_value ?? ""}
        name={name}
        form={form}
        {...(disabled ? { disabled: true } : {})}
      />
    </>
  );
};
