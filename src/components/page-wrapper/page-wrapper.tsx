import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export const PageWrapper = (props: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      px={{ base: 16, md: 54 }}
      py={{ base: 16, md: 40 }}
      flex={1}
      {...props}
    />
  );
};
