import type {
  SearchSelectData,
  SearchSelectNormalizedGroup,
  SearchSelectOption,
  SearchSelectParsedItem,
} from "./types";

const normalizeOption = (
  item: string | SearchSelectOption
): SearchSelectOption =>
  typeof item === "string" ? { value: item, label: item } : item;

export const isOptionGroup = (
  item: SearchSelectParsedItem
): item is SearchSelectNormalizedGroup => "group" in item && "items" in item;

export const normalizeData = (
  data: SearchSelectData
): SearchSelectParsedItem[] =>
  data.map((item) => {
    if (typeof item === "string") {
      return normalizeOption(item);
    }

    if ("group" in item && "items" in item) {
      return {
        group: item.group,
        items: item.items.map(normalizeOption),
      };
    }

    return item;
  });

export const flattenOptions = (
  items: SearchSelectParsedItem[]
): SearchSelectOption[] =>
  items.flatMap((item) => (isOptionGroup(item) ? item.items : [item]));

const getSearchableText = (option: SearchSelectOption) =>
  option.label.toLowerCase();

export const filterItems = (
  items: SearchSelectParsedItem[],
  search: string
): SearchSelectParsedItem[] => {
  const query = search.trim().toLowerCase();
  if (!query) {
    return items;
  }

  return items.reduce<SearchSelectParsedItem[]>((acc, item) => {
    if (isOptionGroup(item)) {
      const filteredItems = item.items.filter((option) =>
        getSearchableText(option).includes(query)
      );

      if (filteredItems.length > 0) {
        acc.push({ group: item.group, items: filteredItems });
      }

      return acc;
    }

    if (getSearchableText(item).includes(query)) {
      acc.push(item);
    }

    return acc;
  }, []);
};
