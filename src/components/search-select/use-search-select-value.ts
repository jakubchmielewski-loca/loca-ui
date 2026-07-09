import { useUncontrolled } from "@mantine/hooks";

type UseSearchSelectSingleValueOptions = {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

type UseSearchSelectMultipleValueOptions = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export const useSearchSelectSingleValue = ({
  value,
  defaultValue,
  onChange,
}: UseSearchSelectSingleValueOptions) => {
  const [_value, setValue] = useUncontrolled<string | null>({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    finalValue: null,
  });

  const selectedValues = _value != null ? [_value] : [];

  const onToggleValue = (optionValue: string) => {
    const nextValue = _value === optionValue ? null : optionValue;
    setValue(nextValue);
    onChange?.(nextValue);
  };

  return { selectedValues, onToggleValue };
};

export const useSearchSelectMultipleValue = ({
  value,
  defaultValue,
  onChange,
}: UseSearchSelectMultipleValueOptions) => {
  const [_value, setValue] = useUncontrolled<string[]>({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    finalValue: [],
  });

  const onToggleValue = (optionValue: string) => {
    const nextValues = _value.includes(optionValue)
      ? _value.filter((item) => item !== optionValue)
      : [..._value, optionValue];
    setValue(nextValues);
    onChange?.(nextValues);
  };

  return { selectedValues: _value, onToggleValue };
};
