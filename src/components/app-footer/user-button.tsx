import { ActionIcon, Box, Group, Stack, Text } from "@mantine/core";
import { Crown, Settings } from "lucide-react";
import { AppFooterContext } from "./context";
import { useContext } from "react";

export const UserButton = () => {
  const {
    user: { isAdmin, username, email },
  } = useContext(AppFooterContext);

  return (
    <Group justify="space-between" gap={0} wrap="nowrap" p={16} pe={8}>
      <Stack gap={4} flex={1} miw={0}>
        <Group align="center" gap={6} wrap="nowrap" miw={0}>
          {isAdmin && (
            <Box mt={1} component="span" style={{ flexShrink: 0 }}>
              <Crown width={14} height={14} />
            </Box>
          )}
          <Text lh={1} fz={16} fw={500} ff="heading" c="textStrong" truncate>
            {username}
          </Text>
        </Group>
        <Text lh={1} fz={12} fw={400} c="gray.6" truncate>
          {email}
        </Text>
      </Stack>
      <ActionIcon
        variant="subtle"
        c="navy"
        onClick={() => {
          window.location.href = "https://login.loca.pl/settings";
        }}
      >
        <Settings size={16} />
      </ActionIcon>
    </Group>
  );
};
