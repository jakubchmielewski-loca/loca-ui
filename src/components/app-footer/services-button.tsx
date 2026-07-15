import { Button, Flex, Group, Text, useMatches } from "@mantine/core";
import { LayoutGrid } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { ServicesPopover, useServices } from "../services";
import { useContext } from "react";
import { AppFooterContext } from "./context";

export const AppFooterServicesButton = () => {
  const isDesktop = useMatches({
    base: false,
    sm: true,
  });
  const { isOpen, toggle } = useServices();
  const { onViewAllServices } = useContext(AppFooterContext);

  const onClick = () => {
    if (isDesktop) {
      toggle();
      return;
    }

    if (onViewAllServices) {
      onViewAllServices();
      return;
    }

    toggle();
  };

  return (
    <ServicesPopover>
      <Button
        variant="subtle"
        px={16}
        py={12}
        radius="xl"
        fullWidth
        onClick={onClick}
        {...(isOpen ? { bg: uiColors.surfaceNavySoft } : {})}
      >
        <Group gap={8} align="center">
          <Flex c="navy">
            <LayoutGrid size={16} />
          </Flex>
          <Text fz={14} lh={1} ff="heading">
            Usługi
          </Text>
        </Group>
      </Button>
    </ServicesPopover>
  );
};
