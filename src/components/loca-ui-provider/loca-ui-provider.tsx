import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "./main.css";
import { theme } from "./theme";

export const LocaUiProvider = ({ children }: { children: React.ReactNode }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
