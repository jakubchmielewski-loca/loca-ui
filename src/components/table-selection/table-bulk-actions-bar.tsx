import { Button, Group, Menu, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { getBulkActionConfirmMessage } from "./format-bulk-action-item-count";
import { formatSelectedCount } from "./format-selected-count";

export type BulkActionConfirmOptions = {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
};

export type BulkAction<TId> = {
  id: string;
  label: string;
  onClick?: (selectedIds: TId[]) => void | Promise<void>;
  disabled?: boolean;
  color?: string;
  children?: BulkAction<TId>[];
  confirm?: boolean | BulkActionConfirmOptions;
};

export type TableBulkActionsBarProps<TId> = {
  selectedCount: number;
  selectedIds: TId[];
  actions: BulkAction<TId>[];
  onClear: () => void;
  loading?: boolean;
};

const isBulkActionGroup = <TId,>(action: BulkAction<TId>): boolean =>
  Array.isArray(action.children) && action.children.length > 0;

const isBulkActionEnabled = <TId,>(action: BulkAction<TId>): boolean => {
  if (isBulkActionGroup(action)) {
    return action.children!.some((child) => !child.disabled);
  }

  return !action.disabled;
};

const getConfirmOptions = <TId,>(
  action: BulkAction<TId>,
): BulkActionConfirmOptions | null => {
  if (!action.confirm) {
    return null;
  }

  if (action.confirm === true) {
    return {};
  }

  return action.confirm;
};

type RenderBulkActionItemOptions<TId> = {
  action: BulkAction<TId>;
  selectedIds: TId[];
  loading: boolean;
  parentLabel?: string;
  onActionClick: (
    action: BulkAction<TId>,
    actionLabel: string,
    selectedIds: TId[],
  ) => void;
};

const renderBulkActionItem = <TId,>({
  action,
  selectedIds,
  loading,
  parentLabel,
  onActionClick,
}: RenderBulkActionItemOptions<TId>): ReactNode => {
  if (isBulkActionGroup(action)) {
    const groupDisabled =
      action.disabled ||
      loading ||
      action.children!.every((child) => child.disabled);

    return (
      <Menu.Sub key={action.id}>
        <Menu.Sub.Target>
          <Menu.Sub.Item
            {...(action.color ? { color: action.color } : {})}
            disabled={groupDisabled}
          >
            {action.label}
          </Menu.Sub.Item>
        </Menu.Sub.Target>
        <Menu.Sub.Dropdown>
          {action.children!.map((child) =>
            renderBulkActionItem({
              action: child,
              selectedIds,
              loading,
              parentLabel: action.label,
              onActionClick,
            }),
          )}
        </Menu.Sub.Dropdown>
      </Menu.Sub>
    );
  }

  const actionLabel = parentLabel
    ? `${parentLabel} — ${action.label}`
    : action.label;

  return (
    <Menu.Item
      key={action.id}
      {...(action.color ? { color: action.color } : {})}
      disabled={action.disabled || loading}
      onClick={() => onActionClick(action, actionLabel, selectedIds)}
    >
      {action.label}
    </Menu.Item>
  );
};

export const TableBulkActionsBar = <TId,>({
  selectedCount,
  selectedIds,
  actions,
  onClear,
  loading = false,
}: TableBulkActionsBarProps<TId>) => {
  const modals = useModals();

  if (selectedCount === 0) {
    return null;
  }

  const hasEnabledActions = actions.some(isBulkActionEnabled);

  const handleActionClick = (
    action: BulkAction<TId>,
    actionLabel: string,
    currentSelectedIds: TId[],
  ) => {
    if (!action.onClick) {
      return;
    }

    const confirmOptions = getConfirmOptions(action);

    if (!confirmOptions) {
      void action.onClick(currentSelectedIds);
      return;
    }

    modals.openConfirmModal({
      title: confirmOptions.title ?? "Potwierdź akcję",
      children: (
        <Text size="sm">
          {confirmOptions.message ??
            getBulkActionConfirmMessage(
              actionLabel,
              currentSelectedIds.length,
            )}
        </Text>
      ),
      labels: {
        confirm: confirmOptions.confirmLabel ?? "Tak",
        cancel: confirmOptions.cancelLabel ?? "Nie",
      },
      ...(confirmOptions.confirmColor
        ? { confirmProps: { color: confirmOptions.confirmColor } }
        : {}),
      onConfirm: () => {
        void action.onClick?.(currentSelectedIds);
      },
    });
  };

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
              disabled={!hasEnabledActions}
            >
              Wybierz akcję
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {actions.map((action) =>
              renderBulkActionItem({
                action,
                selectedIds,
                loading,
                onActionClick: handleActionClick,
              }),
            )}
          </Menu.Dropdown>
        </Menu>

        <Button variant="subtle" onClick={onClear} disabled={loading}>
          Wyczyść zaznaczenie
        </Button>
      </Group>
    </Group>
  );
};
