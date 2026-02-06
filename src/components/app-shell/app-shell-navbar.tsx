import { AppShell } from "@mantine/core";

export const AppShellNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell.Navbar py={{ base: 16 }} pt={{ lg: 40 }} pb={{ lg: 24 }}>
      {children}
    </AppShell.Navbar>
  );
};
