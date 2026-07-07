import { Button, Box, SimpleGrid, Stack, Text } from "@mantine/core";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { useServices } from "./use-services";
import { ExternalLink } from "lucide-react";

export const ServicesPanel = () => {
  const { items, close, onViewAll } = useServices();

  if (items.length === 0) {
    return (
      <Text size="sm" c="dimmed" px={24} py={16}>
        Brak dostępnych usług
      </Text>
    );
  }

  return (
    <Stack gap={0}>
      <SimpleGrid cols={2} spacing={8} p={8}>
        {items.map((service, index) => (
          <Button
            key={`${service.code}-${index}`}
            variant="outline"
            h={100}
            onClick={() => {
              window.location.href = service.url;
              close();
            }}
            px={16}
            style={{ borderColor: uiColors.borderSubtle }}
          >
            <Stack align="center">
              <Box c="inherit">
                <service.Icon
                  width={42}
                  height={42}
                  aria-label={service.label}
                />
              </Box>
              <Text
                fz={12}
                fw={500}
                lh={1.1}
                ff="heading"
                c={uiColors.textStrong}
                ta="center"
              >
                {service.label}
              </Text>
            </Stack>
          </Button>
        ))}
      </SimpleGrid>
      <Button
        c="navy"
        variant="subtle"
        fullWidth
        style={{
          borderTop: `2px solid ${uiColors.borderSubtle}`,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        onClick={onViewAll}
        rightSection={<ExternalLink size={14} />}
      >
        <Text fz={12} fw={500} lh={1.1} ff="heading" ta="center">
          Wszystkie usługi
        </Text>
      </Button>
    </Stack>
  );
};
