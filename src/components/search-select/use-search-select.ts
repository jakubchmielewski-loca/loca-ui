import { useContext } from "react";

import { SearchSelectContext } from "./context";
import type { SearchSelectContextValue } from "./types";

export const useSearchSelect = (): SearchSelectContextValue => {
  const context = useContext(SearchSelectContext);

  if (!context) {
    throw new Error("useSearchSelect must be used within SearchSelectProvider");
  }

  return context;
};
