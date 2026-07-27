/**
 * Kanoniczne kody i nazwy unitów (modułów) oraz systemów.
 * Utrzymuj kopie zsynchronizowane — przy zmianie skopiuj do
 * server/src/common/loca-catalog.ts oraz innych aplikacji Loca.
 */

export const UNITS = [
  { code: "KAR", name: "e-Kartoteka", isInternalOnly: false },
  { code: "KD", name: "Kontrola Dostępu", isInternalOnly: false },
  { code: "RCP", name: "Rejestracja Czasu Pracy", isInternalOnly: false },
  { code: "ESW", name: "e-Świetlica", isInternalOnly: false },
  { code: "KRT", name: "Loca Karty", isInternalOnly: false },
  { code: "KRT_OPS", name: "Centrum Realizacji Kart", isInternalOnly: true },
  { code: "SRV", name: "Serwis", isInternalOnly: false },
  { code: "SRV_OPS", name: "Centrum Serwisowe", isInternalOnly: true },
] as const;

export const SYSTEMS = [
  {
    code: "KAR_ADMIN",
    name: "e-Kartoteka",
    unitCode: "KAR",
    isAdministrative: true,
    url: "https://kartoteka.loca.pl",
  },
  {
    code: "KD_ADMIN",
    name: "Kontrola Dostępu",
    unitCode: "KD",
    isAdministrative: true,
    url: "https://kontrola-dostepu.loca.pl",
  },
  {
    code: "RCP_ADMIN",
    name: "Rejestracja Czasu Pracy",
    unitCode: "RCP",
    isAdministrative: true,
    url: "https://rcp-admin.loca.pl",
  },
  {
    code: "RCP",
    name: "Rejestracja Czasu Pracy — Pracownik",
    unitCode: "RCP",
    isAdministrative: false,
    url: "https://rcp.loca.pl",
  },
  {
    code: "ESW_ADMIN",
    name: "e-Świetlica",
    unitCode: "ESW",
    isAdministrative: true,
    url: "https://e-swietlica.loca.pl",
  },
  {
    code: "KRT_ADMIN",
    name: "Loca Karty",
    unitCode: "KRT",
    isAdministrative: true,
    url: "https://karty.loca.pl",
  },
  {
    code: "KRT_OPS",
    name: "Centrum Realizacji Kart",
    unitCode: "KRT_OPS",
    isAdministrative: true,
    url: "https://admin-karty.loca.pl",
  },
  {
    code: "SRV_ADMIN",
    name: "Serwis",
    unitCode: "SRV",
    isAdministrative: true,
    url: "https://serwis-nowy.loca.pl",
  },
  {
    code: "SRV_OPS",
    name: "Centrum Serwisowe",
    unitCode: "SRV_OPS",
    isAdministrative: true,
    url: "https://serwis-nowy-admin.loca.pl",
  },
] as const;

export type UnitCode = (typeof UNITS)[number]["code"];
export type SystemCode = (typeof SYSTEMS)[number]["code"];
export type UnitDefinition = (typeof UNITS)[number];
export type SystemDefinition = (typeof SYSTEMS)[number];

/** Enum-style access: UnitCode.KAR === 'KAR' */
export const UnitCode = {
  KAR: "KAR",
  KD: "KD",
  RCP: "RCP",
  ESW: "ESW",
  KRT: "KRT",
  KRT_OPS: "KRT_OPS",
  SRV: "SRV",
  SRV_OPS: "SRV_OPS",
} as const satisfies Record<UnitCode, UnitCode>;

/** Wartości kodów unitów — do walidacji / list. */
export const UNIT_CODE_VALUES = Object.values(UnitCode) as UnitCode[];

/** Enum-style access: SystemCode.KAR_ADMIN === 'KAR_ADMIN' */
export const SystemCode = {
  KAR_ADMIN: "KAR_ADMIN",
  KD_ADMIN: "KD_ADMIN",
  RCP_ADMIN: "RCP_ADMIN",
  RCP: "RCP",
  ESW_ADMIN: "ESW_ADMIN",
  KRT_ADMIN: "KRT_ADMIN",
  KRT_OPS: "KRT_OPS",
  SRV_ADMIN: "SRV_ADMIN",
  SRV_OPS: "SRV_OPS",
} as const satisfies Record<SystemCode, SystemCode>;

const UNITS_BY_CODE = Object.fromEntries(
  UNITS.map((unit) => [unit.code, unit])
) as Record<UnitCode, UnitDefinition>;

const SYSTEMS_BY_CODE = Object.fromEntries(
  SYSTEMS.map((system) => [system.code, system])
) as Record<SystemCode, SystemDefinition>;

export function getUnit(code: UnitCode): UnitDefinition {
  return UNITS_BY_CODE[code];
}

export function getSystem(code: SystemCode): SystemDefinition {
  return SYSTEMS_BY_CODE[code];
}

export function getSystemsForUnit(
  unitCode: UnitCode
): ReadonlyArray<SystemDefinition> {
  return SYSTEMS.filter((system) => system.unitCode === unitCode);
}

export function isUnitCode(code: string): code is UnitCode {
  return Object.hasOwn(UNITS_BY_CODE, code);
}

export function isSystemCode(code: string): code is SystemCode {
  return Object.hasOwn(SYSTEMS_BY_CODE, code);
}
