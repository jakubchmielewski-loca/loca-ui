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
  return <Stack className="h-full">{children}</Stack>;
};

const NavbarHeader = ({ systemName }: { systemName: string }) => {
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

const NavbarMain = ({ children }: { children: React.ReactNode }) => {
  return <Box className="flex-1 min-h-0">{children}</Box>;
};

const NavbarList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack className="h-full overflow-y-auto" gap={0}>
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
      <Group
        className="px-[24px] py-3 relative hover:bg-[#EAF0FB]"
        bg={isActive ? "#EAF0FB" : ""}
      >
        {isActive && (
          <Box className="absolute top-0 left-0 w-[5px] h-full bg-[#2C4E97]" />
        )}

        {Icon && (
          <Box
            className="w-8 h-8 flex justify-center items-center"
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
  return <Stack className="mt-auto px-[24px]">{children}</Stack>;
};

Navbar.Header = NavbarHeader;
Navbar.Main = NavbarMain;
Navbar.List = NavbarList;
Navbar.ListItem = NavbarListItem;
Navbar.Footer = NavbarFooter;

export { Navbar };
