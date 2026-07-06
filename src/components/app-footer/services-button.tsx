import { Button, Flex, Group, Text } from "@mantine/core";
import { LayoutGrid } from "lucide-react";

export const AppFooterServicesButton = () => {
  return (
    <Button variant="subtle" px={16} py={12} radius="xl" fullWidth>
      <Group gap={8} align="center">
        <Flex c="navy">
          <LayoutGrid size={16} />
        </Flex>
        <Text fz={14} lh={1} ff="heading">
          Usługi
        </Text>
      </Group>
    </Button>
  );
};
