export const formatBulkActionItemCount = (count: number): string => {
  if (count === 1) {
    return "1 pozycji";
  }

  return `${count} pozycjach`;
};

export const getBulkActionConfirmMessage = (
  actionLabel: string,
  count: number,
): string => {
  return `Czy chcesz wykonać akcję „${actionLabel}" na ${formatBulkActionItemCount(count)}?`;
};
