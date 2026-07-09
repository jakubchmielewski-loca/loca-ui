import { SearchSelectProvider } from "./search-select-provider";
import { SearchSelectRoot } from "./search-select-root";
import type { SearchSelectBaseProps, SearchSelectProps } from "./types";
import {
  useSearchSelectMultipleValue,
  useSearchSelectSingleValue,
} from "./use-search-select-value";

export type { SearchSelectOption, SearchSelectProps } from "./types";

const SearchSelectSingle = ({
  value,
  defaultValue,
  onChange,
  ...props
}: SearchSelectBaseProps & {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
}) => {
  const { selectedValues, onToggleValue } = useSearchSelectSingleValue({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    ...(onChange !== undefined ? { onChange } : {}),
  });

  return (
    <SearchSelectProvider
      {...props}
      multiple={false}
      selectedValues={selectedValues}
      onToggleValue={onToggleValue}
    >
      <SearchSelectRoot />
    </SearchSelectProvider>
  );
};

const SearchSelectMultiple = ({
  value,
  defaultValue,
  onChange,
  ...props
}: SearchSelectBaseProps & {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}) => {
  const { selectedValues, onToggleValue } = useSearchSelectMultipleValue({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    ...(onChange !== undefined ? { onChange } : {}),
  });

  return (
    <SearchSelectProvider
      {...props}
      multiple
      selectedValues={selectedValues}
      onToggleValue={onToggleValue}
    >
      <SearchSelectRoot />
    </SearchSelectProvider>
  );
};

export const SearchSelect = (props: SearchSelectProps) => {
  if (props.multiple) {
    return <SearchSelectMultiple {...props} />;
  }

  return <SearchSelectSingle {...props} />;
};
