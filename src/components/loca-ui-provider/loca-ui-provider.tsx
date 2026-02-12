import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./main.css";
import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";

export const LocaUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};
