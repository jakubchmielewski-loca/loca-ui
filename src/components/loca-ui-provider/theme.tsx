import {
  createTheme,
  rem,
  type CSSVariablesResolver,
  type MantineTheme,
} from "@mantine/core";
import { navy } from "../../utils/navy";
import { ChevronDown, FileUp } from "lucide-react";
import "@fontsource-variable/open-sans";
import { uiColors } from "./theme-tokens";

const primaryColor = navy;

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--ui-primary-accent": theme.other["uiColors"].primaryAccent,
    "--ui-primary-accent-soft-bg": theme.other["uiColors"].primaryAccentSoftBg,
    "--ui-surface-elevated": theme.other["uiColors"].surfaceElevated,
    "--ui-tabs-active-bg": theme.other["uiColors"].tabsActiveBg,
    "--ui-table-header-bg": theme.other["uiColors"].tableHeaderBg,
    "--ui-table-hover-bg": theme.other["uiColors"].tableHover,
  },
  light: {},
  dark: {},
});

export const theme = createTheme({
  fontFamily: "'Open Sans Variable', sans-serif",
  primaryColor: "navy",
  primaryShade: { light: 6, dark: 6 },
  colors: {
    navy,
  },
  other: {
    uiColors,
  },
  components: {
    AppShell: {
      defaultProps: {
        layout: "alt",
        header: { height: { base: 72, md: 0 } },
        footer: { height: 60 },
        navbar: {
          width: 300,
          breakpoint: "sm",
        },
        padding: 0,
      },
      vars: (theme: MantineTheme) => ({
        root: {
          "--app-shell-border-color": theme.other["uiColors"].appShellBorder,
        },
      }),
    },

    AppShellHeader: {
      defaultProps: {
        hiddenFrom: "sm",
      },
    },

    AppShellMain: {
      defaultProps: {
        bg: uiColors.appMainBg,
        display: "flex",
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.other["uiColors"].appMainBg,
        },
      }),
    },

    AppShellNavbar: {
      defaultProps: {
        pt: { base: 16, lg: 40 },
        pb: { base: 16, lg: 24 },
      },
    },

    Button: {
      vars: () => ({
        root: {
          "--button-height": rem(48),
          "--button-padding-x": rem(24),
          "--button-fz": rem(14),
          "--button-radius": rem(4),
        },
      }),
    },

    Title: {
      vars: () => ({
        root: {
          "--title-fw": 600,
        },
      }),
    },

    Tabs: {
      styles: () => ({
        tabLabel: {
          fontWeight: 500,
        },
      }),
      vars: (theme: MantineTheme) => ({
        tab: {
          "--tabs-color": "transparent",
          "--tab-bg": theme.other["uiColors"].tabsActiveBg,
        },
      }),
    },

    TabsTab: {
      defaultProps: {
        p: 16,
      },
    },

    TabsList: {
      defaultProps: {
        px: { base: 0, md: 24 },
      },
    },

    TabsPanel: {
      defaultProps: {
        p: { base: `${rem(16)} 0 0`, md: `${rem(40)} ${rem(24)}` },
      },
    },

    Input: {
      vars: (theme: MantineTheme) => ({
        input: {
          "--input-height": rem(40),
          "--input-bd": theme.other["uiColors"].inputBorder,
          "--input-placeholder-color": theme.other["uiColors"].inputPlaceholder,
        },
        section: {
          "--input-section-color": primaryColor[6],
        },
      }),
    },

    Select: {
      defaultProps: {
        rightSection: <ChevronDown size={16} />,
      },
      styles: () => ({
        section: {
          color: primaryColor[6],
        },
      }),
    },

    Drawer: {
      vars: (theme: MantineTheme) => ({
        root: {
          "--overlay-bg": theme.other["uiColors"].overlayBg,
        },
      }),
      styles: () => ({
        header: {
          height: 0,
          minHeight: 0,
          alignItems: "flex-start",
          padding: 0,
        },
        body: {
          paddingTop: 36,
          paddingRight: 24,
          paddingBottom: 36,
          paddingLeft: 24,
        },
        close: {
          width: rem(72),
          height: rem(72),
          padding: rem(16),
          backgroundColor: uiColors.surfaceNavySoft,
          color: uiColors.textMuted,
          "&:hover": {
            backgroundColor: uiColors.surfaceElevated,
          },
        },
      }),
    },

    Modal: {
      defaultProps: {
        size: "lg",
      },
      vars: (theme: MantineTheme) => ({
        root: {
          "--overlay-bg": theme.other["uiColors"].overlayBg,
          "--modal-size-lg": rem(744),
        },
        content: {
          "--paper-radius": rem(24),
          "--mb-shadow": "none",
          "--modal-content-height": "100%",
        },
      }),
      styles: () => ({
        header: {
          padding: 0,
          paddingBottom: rem(32),
        },
        title: {
          fontSize: rem(32),
          fontWeight: 600,
          paddingTop: rem(36),
          paddingLeft: rem(24),
          paddingRight: rem(24),
          paddingBottom: 0,
        },
        body: {
          paddingLeft: rem(24),
          paddingRight: rem(24),
        },
        close: {
          width: rem(72),
          height: rem(72),
          padding: rem(16),
          backgroundColor: uiColors.surfaceNavySoft,
          color: uiColors.textMuted,
          "&:hover": {
            backgroundColor: uiColors.surfaceElevated,
          },
        },
      }),
    },

    Table: {
      defaultProps: {
        highlightOnHoverColor: uiColors.tableHover,
      },
      vars: (theme: MantineTheme) => ({
        thead: {
          "--table-border-color": "transparent",
        },
        tbody: {
          "--table-border-color": theme.other["uiColors"].tableBodyBorder,
        },
      }),
      styles: (theme: MantineTheme) => ({
        thead: {
          borderBottom: "none",
          backgroundColor: theme.other["uiColors"].tableHeaderBg,
        },
        th: {
          color: theme.other["uiColors"].tableCellText,
          fontWeight: 500,
          paddingLeft: rem(24),
          paddingRight: rem(24),
          paddingTop: rem(16),
          paddingBottom: rem(16),
          lineHeight: rem(16),
        },
        td: {
          paddingTop: rem(12),
          paddingBottom: rem(12),
          paddingLeft: rem(24),
          paddingRight: rem(24),
          color: theme.other["uiColors"].tableCellText,
        },
        tfoot: {
          borderTop: `${rem(2)} solid ${
            theme.other["uiColors"].tableBodyBorder
          }`,
        },
      }),
    },

    TableTd: {
      defaultProps: {
        fz: 16,
        lh: 2,
      },
    },

    Pagination: {
      defaultProps: {
        radius: "xl",
        gap: rem(4),
      },
      styles: (theme: MantineTheme) => ({
        control: {
          borderColor: theme.other["uiColors"].paginationBorder,
          fontSize: rem(14),
          fontWeight: 500,
        },
      }),
    },

    SegmentedControl: {
      defaultProps: {
        withItemsBorders: false,
      },
      vars: () => ({
        root: {
          "--sc-radius": rem(8),
        },
        label: {
          "--sc-padding": `${rem(8)} ${rem(16)}`,
        },
        indicator: {
          "--sc-shadow": "none",
        },
      }),
      styles: (theme: MantineTheme) => ({
        root: {
          padding: rem(8),
          backgroundColor: theme.other["uiColors"].segmentedBg,
        },
      }),
    },

    Paper: {
      vars: (theme: MantineTheme) => ({
        root: {
          "--paper-border-color": theme.other["uiColors"].paperBorder,
        },
      }),
    },

    FileInput: {
      defaultProps: {
        leftSection: <FileUp size={16} />,
        placeholder: "Wybierz plik",
      },
    },
  },
});
