import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

type Mode = "week" | "month" | "year";

interface DateNavigatorProps {
  value: Date;
  onChange: (date: Date) => void;
  mode: Mode;
}

export const DateSwitcher = ({ value, onChange, mode }: DateNavigatorProps) => {
  const date = dayjs(value);

  const handlePrev = () => {
    onChange(date.subtract(1, mode).toDate());
  };

  const handleNext = () => {
    onChange(date.add(1, mode).toDate());
  };

  const label = (() => {
    switch (mode) {
      case "week":
        return `Tydzień ${date.week()} • ${date.year()}`;
      case "month":
        return date.format("MMMM YYYY");
      case "year":
        return date.format("YYYY");
    }
  })();

  return (
    <Paper
      radius="xl"
      px={20}
      py={16}
      withBorder
      style={{
        backgroundColor: "#F4F6FA",
      }}
    >
      <Group justify="space-between" gap={9}>
        <Text fz={14} fw={500}>
          {label}
        </Text>

        <Group gap={6}>
          <ActionIcon
            variant="outline"
            radius="xl"
            size={24}
            onClick={handlePrev}
          >
            <ChevronLeft size={18} />
          </ActionIcon>

          <ActionIcon
            variant="outline"
            radius="xl"
            size={24}
            onClick={handleNext}
          >
            <ChevronRight size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};
