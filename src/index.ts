// Central exports for loca-ui library
// Thanks to this file consumers can use:
// import { AppShell, LocaUiProvider, Button, ... } from "@grupa-loca/loca-ui";

// Layout & shell
export * from "./components/app-shell";
export * from "./components/page-pane";
export * from "./components/app-footer";

// Basic building blocks (wrappers around Mantine)
export * from "./components/box";
export * from "./components/button";
export * from "./components/group";
export * from "./components/modal";
export * from "./components/navbar";
export * from "./components/pagination";
export * from "./components/paper";
export * from "./components/search-input";
export * from "./components/select";
export * from "./components/stack";
export * from "./components/stepper";
export * from "./components/table";
export * from "./components/table-footer";
export * from "./components/tabs";
export * from "./components/text";
export * from "./components/text-input";
export * from "./components/title";

// Provider (theme, globals, etc.)
export * from "./components/loca-ui-provider";

// Hooks
export { default as useNavbar } from "./hooks/use-navbar";

// Mantine defaults
export * as Mantine from "@mantine/core";
export * as MantineHooks from "@mantine/hooks";
