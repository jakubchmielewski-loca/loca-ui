import {
  SYSTEMS,
  SystemCode,
  getSystemsForUnit,
  isSystemCode,
  isUnitCode,
  type SystemCode as SystemCodeType,
  type UnitCode,
} from "../../shared/kartoteka/loca-catalog";
import {
  EswOpsIcon,
  KarIcon,
  KdIcon,
  KrtIcon,
  KrtOpsIcon,
  RcpIcon,
  RcpOpsIcon,
  SrvIcon,
  SrvOpsIcon,
} from "./icons";
import { LEGACY_SERVICE_CODE_ALIASES } from "./service-codes";
import type { ServiceCode, ServiceItem } from "./types";
import type { SVGProps, ReactNode } from "react";

type ServiceIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

const SYSTEM_ICONS: Record<SystemCodeType, ServiceIcon> = {
  [SystemCode.KAR_ADMIN]: KarIcon,
  [SystemCode.KD_ADMIN]: KdIcon,
  [SystemCode.RCP_ADMIN]: RcpOpsIcon,
  [SystemCode.RCP]: RcpIcon,
  [SystemCode.ESW_ADMIN]: EswOpsIcon,
  [SystemCode.KRT_ADMIN]: KrtIcon,
  [SystemCode.KRT_OPS]: KrtOpsIcon,
  [SystemCode.SRV_ADMIN]: SrvIcon,
  [SystemCode.SRV_OPS]: SrvOpsIcon,
};

const toDashboardUrl = (baseUrl: string) =>
  baseUrl.endsWith("/") ? `${baseUrl}dashboard` : `${baseUrl}/dashboard`;

const SERVICE_BY_SYSTEM_CODE = new Map(
  SYSTEMS.map((system) => [
    system.code,
    {
      label: system.name,
      Icon: SYSTEM_ICONS[system.code],
      url: toDashboardUrl(system.url),
    },
  ])
);

const normalizeCode = (code: ServiceCode) =>
  code
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const resolveUnitToSystemCode = (unitCode: UnitCode): SystemCodeType | null => {
  const administrativeSystems = getSystemsForUnit(unitCode).filter(
    (system) => system.isAdministrative
  );

  if (administrativeSystems.length === 1) {
    return administrativeSystems[0]!.code;
  }

  const preferredAdminSystem = administrativeSystems.find((system) =>
    system.code.endsWith("_ADMIN")
  );

  return preferredAdminSystem?.code ?? administrativeSystems[0]?.code ?? null;
};

const resolveSystemCode = (code: ServiceCode): SystemCodeType | null => {
  const normalized = normalizeCode(code);

  if (isSystemCode(normalized)) {
    return normalized;
  }

  if (Object.hasOwn(LEGACY_SERVICE_CODE_ALIASES, normalized)) {
    return LEGACY_SERVICE_CODE_ALIASES[
      normalized as keyof typeof LEGACY_SERVICE_CODE_ALIASES
    ];
  }

  if (isUnitCode(normalized)) {
    return resolveUnitToSystemCode(normalized);
  }

  return null;
};

export const getServicesFromCodes = (
  serviceCodes: ServiceCode[]
): ServiceItem[] => {
  return serviceCodes.flatMap((code) => {
    const systemCode = resolveSystemCode(code);
    if (!systemCode) {
      return [];
    }

    const service = SERVICE_BY_SYSTEM_CODE.get(systemCode);
    if (!service) {
      return [];
    }

    return [
      {
        code,
        label: service.label,
        Icon: service.Icon,
        url: service.url,
      },
    ];
  });
};
