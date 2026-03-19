import { Burger, Container, Group, Text } from "@mantine/core";

type HeaderProps = {
  systemName: string;
  opened: boolean;
  toggle: () => void;
};

export const Header = ({ systemName, opened, toggle }: HeaderProps) => {
  return (
    <Container h="100%">
      <Group h="100%">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          color="navy"
          lineSize={2}
        />
        <Text fz={20} fw={600}>
          {systemName}
        </Text>
      </Group>
    </Container>
  );
};
