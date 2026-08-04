import type { ReactNode, SVGProps } from "react";
import type { KnownServiceCode } from "./service-codes";

export type { KnownServiceCode, LegacyServiceCode } from "./service-codes";

export type ServiceCode = KnownServiceCode | (string & {});

export type ServiceItem = {
  code: ServiceCode;
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  url: string;
};

export type ServicesData = {
  serviceCodes: ServiceCode[];
  organizationId?: number | undefined;
};

export type ServicesContextValue = ServicesData & {
  items: ServiceItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  onServiceClick?: (code: ServiceCode) => void;
  onViewAll?: () => void;
};

export type ServicesProviderProps = ServicesData & {
  children: ReactNode;
};
