import { Select, type SelectProps } from "@mantine/core";
import { uiColors } from "../loca-ui-provider/theme-tokens";

type SearchSelectProps = SelectProps & {
  bg?: string;
};

export const SearchSelect = ({
  bg = uiColors.searchBg,
  ...props
}: SearchSelectProps) => {
  return (
    <Select
      variant="filled"
      radius="xl"
      styles={{
        input: {
          backgroundColor: bg,
          paddingLeft: "24px",
          fontWeight: 600,
        },
      }}
      {...props}
    />
  );
};
