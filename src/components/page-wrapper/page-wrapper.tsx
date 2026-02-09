import { Box } from "@mantine/core";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box px={{ base: 16, md: 54 }} py={{ base: 16, md: 40 }}>
      {children}
    </Box>
  );
};
