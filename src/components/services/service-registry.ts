import eswIcon from "../app-footer/assets/esw.svg";
import eswOpsIcon from "../app-footer/assets/esw_ops.svg";
import karIcon from "../app-footer/assets/kar.svg";
import kdIcon from "../app-footer/assets/kd.svg";
import krtIcon from "../app-footer/assets/krt.svg";
import krtOpsIcon from "../app-footer/assets/krt_ops.svg";
import rcpIcon from "../app-footer/assets/rcp.svg";
import rcpOpsIcon from "../app-footer/assets/rcp_ops.svg";
import srvIcon from "../app-footer/assets/srv.svg";
import srvOpsIcon from "../app-footer/assets/srv_ops.svg";
import type { ServiceCode, ServiceItem } from "./types";

type ServiceDefinition = Omit<ServiceItem, "code"> & {
  aliases: string[];
};

const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  { label: "Kontrola Dostępu", iconSrc: kdIcon, aliases: ["KD"] },
  { label: "Karty Loca", iconSrc: krtIcon, aliases: ["KRT_OPS"] },
  {
    label: "Administracja Kart Loca",
    iconSrc: krtOpsIcon,
    aliases: ["KRT_OPS"],
  },
  { label: "Katoteka", iconSrc: karIcon, aliases: ["KAR"] },
  { label: "Rejestr Czasu Pracy", iconSrc: rcpIcon, aliases: ["RCP"] },
  {
    label: "Administracja Rejestru Czasu Pracy",
    iconSrc: rcpOpsIcon,
    aliases: ["RCP_OPS"],
  },
  { label: "Serwis", iconSrc: srvIcon, aliases: ["SRV"] },
  { label: "Administracja Serwisu", iconSrc: srvOpsIcon, aliases: ["SRV_OPS"] },
  { label: "e-Świetlica", iconSrc: eswIcon, aliases: ["ESW"] },
  {
    label: "Administracja e-Świetlicy",
    iconSrc: eswOpsIcon,
    aliases: ["ESW_OPS"],
  },
];

const normalizeCode = (code: ServiceCode) =>
  code
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const REGISTRY = new Map(
  SERVICE_DEFINITIONS.flatMap((definition) =>
    definition.aliases.map((alias) => [alias, definition] as const)
  )
);

export const getServicesFromCodes = (
  serviceCodes: ServiceCode[]
): ServiceItem[] => {
  const normalized = serviceCodes.map((code) => ({
    original: code,
    normalized: normalizeCode(code),
  }));

  return normalized.flatMap(({ original, normalized }) => {
    const service = REGISTRY.get(normalized);
    if (!service) {
      return [];
    }

    return [
      {
        code: original,
        label: service.label,
        iconSrc: service.iconSrc,
      },
    ];
  });
};
