"use client";

import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { ServicesContext } from "./context";
import { getServicesFromCodes } from "./service-registry";
import type { ServicesContextValue, ServicesProviderProps } from "./types";

export const ServicesProvider = ({
  children,
  serviceCodes,
  onServiceClick,
  onViewAll,
}: ServicesProviderProps) => {
  const [isOpen, { open, close, toggle }] = useDisclosure(false);

  const items = useMemo(
    () => getServicesFromCodes(serviceCodes),
    [serviceCodes]
  );

  const value = useMemo<ServicesContextValue>(
    () => ({
      serviceCodes,
      items,
      isOpen,
      open,
      close,
      toggle,
      ...(onServiceClick !== undefined ? { onServiceClick } : {}),
      ...(onViewAll !== undefined ? { onViewAll } : {}),
    }),
    [
      serviceCodes,
      items,
      isOpen,
      open,
      close,
      toggle,
      onServiceClick,
      onViewAll,
    ]
  );

  return (
    <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
  );
};
