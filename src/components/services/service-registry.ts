import type { ServiceCode, ServiceItem } from "./types";
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

type ServiceDefinition = Omit<ServiceItem, "code"> & {
  aliases: string[];
  url: string;
};

const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    label: "Kontrola Dostępu",
    Icon: KdIcon,
    aliases: ["KD"],
    url: "https://kontrola-dostepu.loca.pl/dashboard",
  },
  {
    label: "Karty Loca",
    Icon: KrtIcon,
    aliases: ["KRT"],
    url: "https://karty.loca.pl/dashboard",
  },
  {
    label: "Administracja Kart Loca",
    Icon: KrtOpsIcon,
    aliases: ["KRT_OPS"],
    url: "https://admin-karty.loca.pl/dashboard",
  },
  {
    label: "Kartoteka",
    Icon: KarIcon,
    aliases: ["KAR"],
    url: "https://kartoteka.loca.pl/dashboard",
  },
  {
    label: "Rejestr Czasu Pracy",
    Icon: RcpIcon,
    aliases: ["RCP"],
    url: "https://rcp.loca.pl/dashboard",
  },
  {
    label: "Administracja Rejestru Czasu Pracy",
    Icon: RcpOpsIcon,
    aliases: ["RCP_OPS"],
    url: "https://rcp-admin.loca.pl/dashboard",
  },
  {
    label: "Serwis",
    Icon: SrvIcon,
    aliases: ["SRV"],
    url: "https://serwis-nowy.loca.pl/dashboard",
  },
  {
    label: "Administracja Serwisu",
    Icon: SrvOpsIcon,
    aliases: ["SRV_OPS"],
    url: "https://serwis-nowy-admin.loca.pl/dashboard",
  },
  {
    label: "Administracja e-Świetlicy",
    Icon: EswOpsIcon,
    aliases: ["ESW_OPS"],
    url: "https://e-swietlica.loca.pl/dashboard",
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
        url: service.url,
      },
    ];
  });
};
