import type { SearchSelectOption } from "./types";

export const normalizeData = (
  data: (string | SearchSelectOption)[]
): SearchSelectOption[] =>
  data.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

const getSearchableText = (option: SearchSelectOption) =>
  option.label.toLowerCase();

export const filterOptions = (
  options: SearchSelectOption[],
  search: string
) => {
  const query = search.trim().toLowerCase();
  if (!query) {
    return options;
  }

  return options.filter((option) => getSearchableText(option).includes(query));
};
