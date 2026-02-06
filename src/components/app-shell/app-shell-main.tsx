import { AppShell, Box } from "@mantine/core";

export const AppShellMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell.Main bg="#ECECEF">
      <Box px={{ base: 16, md: 54 }} py={{ base: 16, md: 40 }}>
        {children}
      </Box>
    </AppShell.Main>
  );
};
