import {
  Box,
  Burger,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import useNavbar from "../../hooks/use-navbar";
import { useHover } from "@mantine/hooks";
import { uiColors } from "../loca-ui-provider/theme-tokens";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return <Stack h="100%">{children}</Stack>;
};

const NavbarHeader = ({
  systemName,
  children,
}: {
  systemName: string;
  children: React.ReactNode;
}) => {
  const { opened, toggle } = useNavbar();

  return (
    <Stack px={{ base: 16, lg: 24 }} gap={24} pb={{ lg: 24 }}>
      <Group>
        <Title fw={600} fz={24} lh="16px">
          {systemName}
        </Title>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          ms="auto"
        />
      </Group>
      {children}
    </Stack>
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

type NavbarListGroupProps = {
  title: string;
  children: React.ReactNode;
};

const NavbarListGroup = ({ title, children }: NavbarListGroupProps) => {
  return (
    <Box pt={28} pb={12}>
      <Text px={30} fw={700} fz={10} tt="uppercase" c="gray.7">
        {title}
      </Text>
      <Stack gap={0}>{children}</Stack>
    </Box>
  );
};

type NavbarListItemProps = {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  Icon?: React.ComponentType<{ className?: string; width?: string }>;
  LinkComponent?: React.ElementType;
};

const NavbarListItem = ({
  children,
  href,
  disabled,
  isActive,
  onClick,
  Icon,
  LinkComponent = "a",
}: NavbarListItemProps) => {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();

  return (
    <LinkComponent
      href={href}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      <Group
        pos="relative"
        px={24}
        py={12}
        bg={isActive || hovered ? uiColors.primaryAccentSoftBg : ""}
        opacity={disabled ? 0.5 : 1}
      >
        {isActive && (
          <Box
            pos="absolute"
            top={0}
            left={0}
            w={5}
            h="100%"
            bg={uiColors.primaryAccent}
          />
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

        <Box
          c={isActive ? uiColors.primaryAccent : uiColors.textStrong}
          fw={isActive ? 600 : 400}
        >
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
Navbar.ListGroup = NavbarListGroup;
Navbar.ListItem = NavbarListItem;
Navbar.Footer = NavbarFooter;

export { Navbar };
