import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";
import React from "react";

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
  const Comp = onSort ? UnstyledButton : React.Fragment;

  return (
    <Comp onClick={onSort} w="100%">
      <Group justify={center ? "center" : "flex-start"} gap={6}>
        <Text fz={16} lh={1} fw={600} c={order ? "navy" : "#7A7C7D"}>
          {text}
        </Text>
        {onSort && (
          <Box c={order ? "navy" : "#929596"}>
            {!order && <ArrowDownUp size={18} strokeWidth={2.4} />}
            {order === "asc" && (
              <ArrowUpNarrowWide size={18} strokeWidth={2.4} />
            )}
            {order === "desc" && (
              <ArrowDownNarrowWide size={18} strokeWidth={2.4} />
            )}
          </Box>
        )}
      </Group>
    </Comp>
  );
};
