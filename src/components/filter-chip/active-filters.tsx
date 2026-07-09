import { Group, Text } from "@mantine/core";

import { FilterChip } from "./filter-chip";

export type ActiveFilter = {
  id: string;
  label: string;
  onRemove: () => void;
  removeLabel?: string;
};

export type ActiveFiltersProps = {
  filters: ActiveFilter[];
  emptyLabel?: string;
};

export const ActiveFilters = ({
  filters,
  emptyLabel = "Brak",
}: ActiveFiltersProps) => (
  <Group gap="xs" align="center" wrap="wrap">
    <Text size="sm" fw={600}>
      Aktywne filtry{filters.length > 0 ? ` (${filters.length})` : ""}:
    </Text>
    {filters.length > 0 ? (
      <Group gap={6} wrap="wrap">
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            onRemove={filter.onRemove}
            {...(filter.removeLabel !== undefined
              ? { removeLabel: filter.removeLabel }
              : {})}
          >
            {filter.label}
          </FilterChip>
        ))}
      </Group>
    ) : (
      <Text size="sm" c="dimmed">
        {emptyLabel}
      </Text>
    )}
  </Group>
);
