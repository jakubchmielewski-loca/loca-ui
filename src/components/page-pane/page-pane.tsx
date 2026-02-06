import { Paper } from "@mantine/core";

export const PagePane = ({ children }: { children: React.ReactNode }) => {
  return (
    <Paper p={24} radius={16}>
      {children}
    </Paper>
  );
};
