import { createContext } from "react";

import type { SearchSelectContextValue } from "./types";

export const SearchSelectContext = createContext<SearchSelectContextValue | null>(
  null
);
