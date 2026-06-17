export type UiColors = {
  borderSubtle: string;
  borderStrong: string;
  surfaceBase: string;
  surfaceElevated: string;
  surfaceNavySoft: string;
  surfaceInfoSoft: string;
  /** Default body text — #454545 (light) */
  textPrimary: string;
  textMuted: string;
  textSecondary: string;
  /** Headings & emphasis — #1C1C1C (light) */
  textStrong: string;
  overlayStrong: string;
  appShellBorder: string;
  appMainBg: string;
  primaryAccent: string;
  primaryAccentSoftBg: string;
  inputBorder: string;
  inputPlaceholder: string;
  overlayBg: string;
  tableHeaderBg: string;
  tableHover: string;
  tableBodyBorder: string;
  tableCellText: string;
  segmentedBg: string;
  tabsActiveBg: string;
  searchBg: string;
  dateSwitcherBg: string;
  paginationBorder: string;
  paperBorder: string;
  lightGray: string;
};

const ld = (light: string, dark: string) => `light-dark(${light}, ${dark})`;

const baseUiColors = {
  borderSubtle: ld("#DEE8EF", "#373A40"),
  borderStrong: ld("#DEE8EF", "#393b41"),
  surfaceBase: ld("#ECECEF", "#1A1B1E"),
  surfaceElevated: ld("#F4F6FA", "#22252A"),
  surfaceNavySoft: ld("#EAF0FB", "#243554"),
  surfaceInfoSoft: ld("#EFF8FD", "#272C33"),
  textPrimary: ld("#454545", "#C1C2C5"),
  textMuted: ld("#7A7C7D", "#909296"),
  overlayStrong: ld("rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.6)"),
  accentPrimary: ld("#2C4E97", "#8DA5DA"),
  appShellBorderTone: ld("#DEE8EF", "#2B2F33"),
  lightGray: ld("#FAFAFA", "#22252A"),
};

export const fontFamilyBody = "'Open Sans Variable', sans-serif";
export const fontFamilyHeadings = "'Outfit Variable', sans-serif";

export const uiColors: UiColors = {
  borderSubtle: baseUiColors.borderSubtle,
  borderStrong: baseUiColors.borderStrong,
  surfaceBase: baseUiColors.surfaceBase,
  surfaceElevated: baseUiColors.surfaceElevated,
  surfaceNavySoft: baseUiColors.surfaceNavySoft,
  surfaceInfoSoft: baseUiColors.surfaceInfoSoft,
  textPrimary: baseUiColors.textPrimary,
  textMuted: baseUiColors.textMuted,
  textSecondary: ld("#929596", "#8A8D91"),
  textStrong: ld("#1C1C1C", "#E9ECEF"),
  overlayStrong: baseUiColors.overlayStrong,
  appShellBorder: baseUiColors.appShellBorderTone,
  appMainBg: baseUiColors.surfaceBase,
  primaryAccent: baseUiColors.accentPrimary,
  primaryAccentSoftBg: baseUiColors.surfaceNavySoft,
  inputBorder: baseUiColors.borderSubtle,
  inputPlaceholder: baseUiColors.textMuted,
  overlayBg: baseUiColors.overlayStrong,
  tableHeaderBg: baseUiColors.surfaceInfoSoft,
  tableHover: baseUiColors.surfaceInfoSoft,
  tableBodyBorder: baseUiColors.borderStrong,
  tableCellText: baseUiColors.textPrimary,
  segmentedBg: baseUiColors.surfaceNavySoft,
  tabsActiveBg: baseUiColors.surfaceNavySoft,
  searchBg: baseUiColors.surfaceElevated,
  dateSwitcherBg: baseUiColors.surfaceElevated,
  paginationBorder: baseUiColors.borderSubtle,
  paperBorder: baseUiColors.borderStrong,
  lightGray: baseUiColors.lightGray,
};
