import { AppShell } from "@mantine/core";

export const AppShellNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell.Navbar className="py-[16px] lg:pt-[40px] lg:pb-[24px]">
      {children}
    </AppShell.Navbar>
  );
};
