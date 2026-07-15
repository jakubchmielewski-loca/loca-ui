import { Combobox } from "@mantine/core";
import type { ReactNode } from "react";

import { uiColors } from "../loca-ui-provider/theme-tokens";

type ComboboxDropdownProps = {
  children: ReactNode;
};

export const ComboboxDropdown = ({ children }: ComboboxDropdownProps) => (
  <Combobox.Dropdown
    style={{
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 16,
      border: `1px solid ${uiColors.borderSubtle}`,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    }}
  >
    {children}
  </Combobox.Dropdown>
);
