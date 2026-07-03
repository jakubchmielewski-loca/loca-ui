import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

export type AltTableThProps = {
  text: string;
  order?: "asc" | "desc" | null;
  onSort?: () => void;
  center?: boolean;
};

export const AltTableTh = ({
  text,
  order,
  onSort,
  center,
}: AltTableThProps) => {
  const content = (
    <Group justify={center ? "center" : "flex-start"} gap={6} wrap="nowrap">
      <Text
        fz={14}
        lh={1}
        fw={600}
        c={order ? uiColors.primaryAccent : uiColors.textMuted}
      >
        {text}
      </Text>
      {onSort && (
        <Box c={order ? uiColors.primaryAccent : uiColors.textSecondary}>
          {!order && <ArrowDownUp size={16} strokeWidth={2} />}
          {order === "asc" && <ArrowUpNarrowWide size={16} strokeWidth={2} />}
          {order === "desc" && (
            <ArrowDownNarrowWide size={16} strokeWidth={2} />
          )}
        </Box>
      )}
    </Group>
  );

  if (onSort) {
    return (
      <UnstyledButton onClick={onSort} w="100%">
        {content}
      </UnstyledButton>
    );
  }

  return content;
};
