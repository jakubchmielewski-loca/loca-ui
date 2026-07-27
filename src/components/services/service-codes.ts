import {
  SystemCode,
  type SystemCode as SystemCodeType,
  type UnitCode,
} from "../../shared/kartoteka/loca-catalog";

/** Historyczne kody z API — mapowane na kanoniczny {@link SystemCode}. */
export const LEGACY_SERVICE_CODE_ALIASES = {
  RCP_PRACOWNIK: SystemCode.RCP,
  RCP_OPS: SystemCode.RCP_ADMIN,
  ESW_OPS: SystemCode.ESW_ADMIN,
} as const satisfies Record<string, SystemCodeType>;

export type LegacyServiceCode = keyof typeof LEGACY_SERVICE_CODE_ALIASES;

export type KnownServiceCode = SystemCodeType | UnitCode | LegacyServiceCode;
