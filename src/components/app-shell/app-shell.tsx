import { AppShell as MantineAppShell } from "@mantine/core";
import { AppShellHeader } from "./app-shell-header";
import { AppShellNavbar } from "./app-shell-navbar";
import { AppShellMain } from "./app-shell-main";

const AppShell = ({
  children,
  navbarOpened,
}: {
  children: React.ReactNode;
  navbarOpened: boolean;
}) => {
  return (
    <MantineAppShell
      layout="alt"
      header={{ height: { base: 72, md: 0 } }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened },
      }}
      padding={0}
    >
      {children}
    </MantineAppShell>
  );
};

AppShell.Header = AppShellHeader;
AppShell.Navbar = AppShellNavbar;
AppShell.Main = AppShellMain;

export { AppShell };
