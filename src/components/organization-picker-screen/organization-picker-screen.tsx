import type { ReactNode } from "react";
import { Button, Center, Group, Loader, Stack, Text } from "@mantine/core";

import { ContextSelect, type ContextSelectOption } from "../context-select";

export type OrganizationPickerScreenProps = {
  options: ContextSelectOption[];
  value: string;
  onChange: (key: string, option: ContextSelectOption) => void;
  onContinue: () => void;
  onLogout?: () => void;
  isLoading?: boolean;
};

/**
 * Full-screen facility picker (presentational). Data fetching stays in the app.
 */
export const OrganizationPickerScreen = ({
  options,
  value,
  onChange,
  onContinue,
  onLogout,
  isLoading = false,
}: OrganizationPickerScreenProps) => {
  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (options.length === 0) {
    return (
      <Center h="100vh">
        <Stack align="center" gap={8} maw={420} px={16}>
          <Text fw={600} fz={18} c="navy">
            Brak placówek
          </Text>
          <Text c="dimmed" ta="center">
            Brak dostępnych placówek dla tego konta.
          </Text>
          <Group mt={16}>
            {onLogout ? (
              <Button variant="light" onClick={onLogout}>
                Wyloguj
              </Button>
            ) : null}
          </Group>
        </Stack>
      </Center>
    );
  }

  return (
    <Center h="100vh">
      <Stack align="center" gap={16} maw={420} w="100%" px={16}>
        <Text fw={600} fz={18} c="navy">
          Wybierz placówkę
        </Text>
        <Text c="dimmed" ta="center">
          Wybierz placówkę, na której chcesz pracować.
        </Text>
        <ContextSelect options={options} value={value} onChange={onChange} />
        <Group mt={8}>
          <Button onClick={onContinue}>Przejdź</Button>
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
