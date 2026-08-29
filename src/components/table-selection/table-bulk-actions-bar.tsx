import { Button, Group, Menu, Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";

import { formatSelectedCount } from "./format-selected-count";

export type BulkAction<TId> = {
  id: string;
  label: string;
  onClick: (selectedIds: TId[]) => void | Promise<void>;
  disabled?: boolean;
  color?: string;
};

export type TableBulkActionsBarProps<TId> = {
  selectedCount: number;
  selectedIds: TId[];
  actions: BulkAction<TId>[];
  onClear: () => void;
  loading?: boolean;
};

export const TableBulkActionsBar = <TId,>({
  selectedCount,
  selectedIds,
  actions,
  onClear,
  loading = false,
}: TableBulkActionsBarProps<TId>) => {
  if (selectedCount === 0) {
    return null;
  }

  const enabledActions = actions.filter((action) => !action.disabled);

  return (
    <Group
      justify="space-between"
      align="center"
      px={24}
      py={12}
      wrap="nowrap"
      gap={16}
    >
      <Text fz={14} fw={600}>
        {formatSelectedCount(selectedCount)}
      </Text>

      <Group gap={8} wrap="nowrap">
        <Menu shadow="md" width={280} position="bottom-end">
          <Menu.Target>
            <Button
              variant="default"
              rightSection={<ChevronDown size={16} />}
              loading={loading}
              disabled={enabledActions.length === 0}
            >
              Wybierz akcję
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {actions.map((action) => (
              <Menu.Item
                key={action.id}
                {...(action.color ? { color: action.color } : {})}
                disabled={action.disabled || loading}
                onClick={() => action.onClick(selectedIds)}
              >
                {action.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        <Button variant="subtle" onClick={onClear} disabled={loading}>
          Wyczyść zaznaczenie
        </Button>
      </Group>
    </Group>
  );
};
