import { Paper, type PaperProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export const PagePane = (props: PropsWithChildren<PaperProps>) => {
  return <Paper p={24} radius={16} {...props} />;
};
