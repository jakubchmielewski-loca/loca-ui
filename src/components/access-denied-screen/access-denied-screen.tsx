import type { ReactNode } from "react";
import { Button, Center, Group, Stack, Text } from "@mantine/core";

export type AccessDeniedScreenProps = {
  onBack?: () => void;
  onLogout?: () => void;
  extraActions?: ReactNode;
};

export const AccessDeniedScreen = ({
  onBack,
  onLogout,
}: AccessDeniedScreenProps) => {
  return (
    <Center h="100vh">
      <Stack align="center" gap={8} maw={480} px={16}>
        <Text fw={600} fz={18} c="navy">
          Brak dostępu
        </Text>
        <Text c="dimmed" ta="center">
          Nie masz dostępu do tej strony.
        </Text>
        <Group mt={16}>
          {onBack ? <Button onClick={onBack}>Powrót</Button> : null}
          {onLogout ? (
            <Button variant="light" onClick={onLogout}>
              Wyloguj
            </Button>
          ) : null}
        </Group>
      </Stack>
    </Center>
  );
};
