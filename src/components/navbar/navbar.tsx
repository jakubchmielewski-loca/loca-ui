import { Burger, Group, Stack, Text } from "@mantine/core";
import useNavbar from "../../hooks/use-navbar";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return <Stack className="h-full">{children}</Stack>;
};

const NavbarTop = ({ systemName }: { systemName: string }) => {
  const { opened, toggle } = useNavbar();

  return (
    <Group className="px-[16px] lg:px-0 lg:pb-[24px]" justify="space-between">
      <Text fw={600} fz={24} ps={{ lg: 24 }} lh="16px">
        {systemName}
      </Text>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </Group>
  );
};

Navbar.Top = NavbarTop;

export { Navbar };
