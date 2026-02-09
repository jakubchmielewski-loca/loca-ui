import {
  Box,
  Burger,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import useNavbar from "../../hooks/use-navbar";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return <Stack h="100%">{children}</Stack>;
};

const NavbarHeader = ({ systemName }: { systemName: string }) => {
  const { opened, toggle } = useNavbar();

  return (
    <Group px={{ base: 16, lg: 0 }} pb={{ lg: 24 }} justify="space-between">
      <Text fw={600} fz={24} ps={{ lg: 24 }} lh="16px">
        {systemName}
      </Text>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </Group>
  );
};

const NavbarMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box flex={1} style={{ minHeight: 0 }}>
      {children}
    </Box>
  );
};

const NavbarList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack h="100%" style={{ overflowY: "auto" }} gap={0}>
      {children}
    </Stack>
  );
};

type NavbarListItemProps = {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentType<{ className?: string; width?: string }>;
  LinkComponent?: React.ElementType;
};

const NavbarListItem = ({
  children,
  href,
  isActive,
  onClick,
  Icon,
  LinkComponent = "a",
}: NavbarListItemProps) => {
  const theme = useMantineTheme();

  return (
    <LinkComponent href={href} onClick={onClick}>
      <Group pos="relative" px={24} py={12} bg={isActive ? "#EAF0FB" : ""}>
        {isActive && (
          <Box pos="absolute" top={0} left={0} w={5} h="100%" bg="#2C4E97" />
        )}

        {Icon && (
          <Box
            w={32}
            h={32}
            display="flex"
            style={{ justifyContent: "center", alignItems: "center" }}
            c={theme.primaryColor}
          >
            <Icon width="20" />
          </Box>
        )}

        <Box c={isActive ? "#2C4E97" : ""} fw={isActive ? 600 : 400}>
          {children}
        </Box>
      </Group>
    </LinkComponent>
  );
};

const NavbarFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack mt="auto" px={24}>
      {children}
    </Stack>
  );
};

Navbar.Header = NavbarHeader;
Navbar.Main = NavbarMain;
Navbar.List = NavbarList;
Navbar.ListItem = NavbarListItem;
Navbar.Footer = NavbarFooter;

export { Navbar };
