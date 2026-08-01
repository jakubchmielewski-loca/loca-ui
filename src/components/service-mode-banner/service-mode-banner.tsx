import { Box, Text, useMatches } from "@mantine/core";

export type ServiceModeBannerProps = {
  organizationName: string;
};

/**
 * Presentational red banner for global-admin "service mode"
 * (browsing a facility without membership).
 */
export const ServiceModeBanner = ({
  organizationName,
}: ServiceModeBannerProps) => {
  const isMobile = useMatches({
    base: true,
    md: false,
  });

  return (
    <Box
      pos="sticky"
      top={isMobile ? 55 : 0}
      px={16}
      py={10}
      style={{
        backgroundColor: "#c92a2a",
        borderRadius: 0,
        zIndex: 1,
      }}
    >
      <Text c="white" fw={600} ta="center" fz={14}>
        {`Przeglądasz placówkę "${organizationName}" w trybie serwisowym.`}
      </Text>
    </Box>
  );
};
