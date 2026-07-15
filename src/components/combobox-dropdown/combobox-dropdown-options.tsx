import { Combobox, ScrollArea } from "@mantine/core";
import type { ReactNode } from "react";

type ComboboxDropdownOptionsProps = {
  children: ReactNode;
  maxHeight?: number | string;
  emptyMessage?: ReactNode;
  isEmpty?: boolean;
};

export const ComboboxDropdownOptions = ({
  children,
  maxHeight = 280,
  emptyMessage = "Brak wyników",
  isEmpty = false,
}: ComboboxDropdownOptionsProps) => (
  <Combobox.Options>
    <ScrollArea.Autosize mah={maxHeight} type="scroll">
      {isEmpty ? <Combobox.Empty>{emptyMessage}</Combobox.Empty> : children}
    </ScrollArea.Autosize>
  </Combobox.Options>
);
