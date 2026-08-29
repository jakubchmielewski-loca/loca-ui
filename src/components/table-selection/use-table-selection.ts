import { useCallback, useMemo, useState } from "react";

export type PageSelectionState = "none" | "some" | "all";

export function getPageSelectionState<TId>(
  pageIds: TId[],
  selectedIds: Set<TId>,
): PageSelectionState {
  if (pageIds.length === 0) {
    return "none";
  }

  const selectedOnPage = pageIds.filter((id) => selectedIds.has(id)).length;

  if (selectedOnPage === 0) {
    return "none";
  }

  if (selectedOnPage === pageIds.length) {
    return "all";
  }

  return "some";
}

export function useTableSelection<TId>() {
  const [selectedIds, setSelectedIds] = useState<Set<TId>>(new Set());

  const toggle = useCallback((id: TId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const togglePage = useCallback((pageIds: TId[]) => {
    setSelectedIds((prev) => {
      const allSelected =
        pageIds.length > 0 && pageIds.every((id) => prev.has(id));
      const next = new Set(prev);

      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }

      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback(
    (id: TId) => selectedIds.has(id),
    [selectedIds],
  );

  const pageSelectionState = useCallback(
    (pageIds: TId[]) => getPageSelectionState(pageIds, selectedIds),
    [selectedIds],
  );

  const selectedIdsArray = useMemo(() => Array.from(selectedIds), [selectedIds]);

  return {
    selectedIds: selectedIdsArray,
    selectedCount: selectedIds.size,
    toggle,
    togglePage,
    clear,
    isSelected,
    pageSelectionState,
  };
}
