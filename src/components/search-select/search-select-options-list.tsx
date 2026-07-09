import { Combobox, ScrollArea } from "@mantine/core";

import { SearchSelectOptionItem } from "./search-select-option-item";
import { useSearchSelect } from "./use-search-select";

export const SearchSelectOptionsList = () => {
  const { filteredOptions, nothingFoundMessage, maxDropdownHeight } =
    useSearchSelect();

  return (
    <Combobox.Options>
      <ScrollArea.Autosize mah={maxDropdownHeight} type="scroll">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SearchSelectOptionItem key={option.value} option={option} />
          ))
        ) : (
          <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
        )}
      </ScrollArea.Autosize>
    </Combobox.Options>
  );
};
