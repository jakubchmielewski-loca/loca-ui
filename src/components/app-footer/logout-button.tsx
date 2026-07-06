import { Button, Flex, Group, Text } from "@mantine/core";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { AppFooterContext } from "./context";

export const AppFooterLogout = () => {
  const { onLogout } = useContext(AppFooterContext);

  return (
    <Button
      variant="subtle"
      px={16}
      py={12}
      radius="xl"
      fullWidth
      onClick={onLogout}
    >
      <Group gap={8} align="center">
        <Flex c="navy">
          <LogOut size={16} />
        </Flex>
        <Text fz={14} lh={1} ff="heading">
          Wyloguj
        </Text>
      </Group>
    </Button>
  );
};
