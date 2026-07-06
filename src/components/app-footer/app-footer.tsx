import { Box, Divider, Group, Stack } from "@mantine/core";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { UserButton } from "./user-button";
import { AppFooterLogout } from "./logout-button";
import { AppFooterServicesButton } from "./services-button";
import { AppFooterNoticesButton } from "./notices-button";

export const AppFooter = () => {
  return (
    <Stack mt="auto">
      <Stack
        bd={`1px solid ${uiColors.borderStrong}`}
        bdrs={8}
        justify="space-between"
        gap={0}
      >
        <UserButton />
        <Divider />
        <AppFooterNoticesButton />
        <Divider />
        <Group gap={0} wrap="nowrap">
          <Box flex={1}>
            <AppFooterServicesButton />
          </Box>
          <Divider orientation="vertical" />
          <Box flex={1}>
            <AppFooterLogout />
          </Box>
        </Group>
      </Stack>
    </Stack>
  );
};
