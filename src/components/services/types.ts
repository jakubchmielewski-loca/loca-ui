import type { ReactNode, SVGProps } from "react";

export type KnownServiceCode =
  | "KD"
  | "KRT"
  | "KRT_OPS"
  | "KAR"
  | "RCP"
  | "RCP_OPS"
  | "SRV"
  | "SRV_OPS"
  | "ESW"
  | "ESW_OPS";

export type ServiceCode = KnownServiceCode | (string & {});

export type ServiceItem = {
  code: ServiceCode;
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  url: string;
};

export type ServicesData = {
  serviceCodes: ServiceCode[];
};

export type ServicesContextValue = ServicesData & {
  items: ServiceItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type ServicesProviderProps = ServicesData & {
  children: ReactNode;
};
