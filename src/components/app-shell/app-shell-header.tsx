import { AppShell } from "@mantine/core";

export const AppShellHeader = ({ children }: { children: React.ReactNode }) => {
  return <AppShell.Header hiddenFrom="md">{children}</AppShell.Header>;
};
