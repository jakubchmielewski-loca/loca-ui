import { Checkbox } from "@mantine/core";

import type { PageSelectionState } from "./use-table-selection";

export const TABLE_SELECTION_COLUMN_WIDTH = 44;

type HeaderProps = {
  variant: "header";
  state: PageSelectionState;
  onChange: () => void;
  disabled?: boolean;
};

type RowProps = {
  variant: "row";
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

export type TableSelectionCheckboxProps = HeaderProps | RowProps;

export const TableSelectionCheckbox = (props: TableSelectionCheckboxProps) => {
  if (props.variant === "header") {
    return (
      <Checkbox
        checked={props.state === "all"}
        indeterminate={props.state === "some"}
        onChange={props.onChange}
        disabled={props.disabled}
        aria-label="Zaznacz wszystkie na stronie"
      />
    );
  }

  return (
    <Checkbox
      checked={props.checked}
      onChange={props.onChange}
      disabled={props.disabled}
      onClick={(event) => event.stopPropagation()}
      aria-label="Zaznacz wiersz"
    />
  );
};
