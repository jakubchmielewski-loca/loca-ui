import { createTheme, rem, type MantineTheme } from "@mantine/core";
import { navy } from "../../utils/navy";
import { ChevronDown } from "lucide-react";

const primaryColor = navy;

export const theme = createTheme({
  fontFamily: "Open Sans, system-ui, -apple-system, sans-serif",
  primaryColor: "navy",
  colors: {
    navy,
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
      vars: () => ({
        root: {
          "--app-shell-border-color": "#DEE8EF",
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
        bg: "#ECECEF",
      },
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
        tab: {
          padding: rem(16),
          "&[data-active]": {
            backgroundColor: "#ff00ff",
          },
        },
        list: {
          paddingLeft: rem(24),
          paddingRight: rem(24),
        },
        panel: {
          paddingLeft: rem(24),
          paddingRight: rem(24),
          paddingTop: rem(40),
          paddingBottom: rem(40),
        },
        tabLabel: {
          fontWeight: 500,
        },
      }),
      vars: () => ({
        tab: {
          "--tabs-color": "transparent",
        },
      }),
    },

    Input: {
      vars: () => ({
        input: {
          "--input-height": rem(40),
          "--input-bd": "#DEE8EF",
          "--input-placeholder-color": "#7A7C7D",
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
      vars: () => ({
        root: {
          "--overlay-bg": "rgba(0, 0, 0, 0.3)",
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
          backgroundColor: primaryColor[0],
          color: primaryColor[6],
          "&:hover": {
            backgroundColor: primaryColor[1],
          },
        },
      }),
    },

    Modal: {
      defaultProps: {
        size: "lg",
      },
      vars: () => ({
        root: {
          "--overlay-bg": "rgba(0, 0, 0, 0.3)",
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
          backgroundColor: primaryColor[0],
          color: primaryColor[6],
          "&:hover": {
            backgroundColor: primaryColor[1],
          },
        },
      }),
    },

    Table: {
      vars: () => ({
        thead: {
          "--table-border-color": "transparent",
        },
        tbody: {
          "--table-border-color": "#DEE8EF",
        },
      }),
      styles: (theme: MantineTheme) => ({
        thead: {
          borderBottom: "none",
        },
        th: {
          color: theme.colors.dark[2],
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
        },
        tfoot: {
          borderTop: `${rem(2)} solid #DEE8EF`,
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
      styles: () => ({
        control: {
          borderColor: "#DEE8EF",
          fontSize: rem(14),
          fontWeight: 500,
        },
      }),
    },
  },
});
