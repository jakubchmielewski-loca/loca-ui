import type { ServiceCode, ServiceItem } from "./types";
import {
  EswIcon,
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

type ServiceDefinition = Omit<ServiceItem, "code"> & {
  aliases: string[];
};

const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  { label: "Kontrola Dostępu", Icon: KdIcon, aliases: ["KD"] },
  { label: "Karty Loca", Icon: KrtIcon, aliases: ["KRT"] },
  {
    label: "Administracja Kart Loca",
    Icon: KrtOpsIcon,
    aliases: ["KRT_OPS"],
  },
  { label: "Katoteka", Icon: KarIcon, aliases: ["KAR"] },
  { label: "Rejestr Czasu Pracy", Icon: RcpIcon, aliases: ["RCP"] },
  {
    label: "Administracja Rejestru Czasu Pracy",
    Icon: RcpOpsIcon,
    aliases: ["RCP_OPS"],
  },
  { label: "Serwis", Icon: SrvIcon, aliases: ["SRV"] },
  { label: "Administracja Serwisu", Icon: SrvOpsIcon, aliases: ["SRV_OPS"] },
  { label: "e-Świetlica", Icon: EswIcon, aliases: ["ESW"] },
  {
    label: "Administracja e-Świetlicy",
    Icon: EswOpsIcon,
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
        Icon: service.Icon,
      },
    ];
  });
};
