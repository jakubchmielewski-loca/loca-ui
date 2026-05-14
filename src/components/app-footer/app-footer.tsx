import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { ChevronDown, Crown, Grid2x2, LogOut, Moon, Sun } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

const OtherServicesMenu = ({
  kartotekaServiceUrl,
  otherServicesUrl,
}: {
  kartotekaServiceUrl: string;
  otherServicesUrl: string;
}) => {
  const theme = useMantineTheme();
  const accent = theme.other["uiColors"].primaryAccent;

  return (
    <Box w="full" bd={`1px solid ${uiColors.borderStrong}`} bdrs={8}>
      <Menu position="top" width="target" withinPortal>
        <Menu.Target>
          <Button
            variant="subtle"
            fullWidth
            h={58}
            leftSection={<Grid2x2 color={accent} />}
            rightSection={<ChevronDown size={16} color={accent} />}
          >
            Przejdź do innej usługi
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => (window.location.href = kartotekaServiceUrl)}>
            Kartoteka
          </Menu.Item>
          <Menu.Item onClick={() => (window.location.href = otherServicesUrl)}>
            Inne usługi
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

const ThemeSwitcher = () => {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon
      variant="subtle"
      size={48}
      radius={`0 0 8px 0`}
      onClick={toggleTheme}
      aria-label="Toggle color scheme"
    >
      {colorScheme === "dark" ? (
        <Sun size={18} color={theme.other["uiColors"].primaryAccent} />
      ) : (
        <Moon size={18} color={theme.other["uiColors"].primaryAccent} />
      )}
    </ActionIcon>
  );
};

const LogoutButton = ({ logoutFn }: { logoutFn: () => void }) => {
  const theme = useMantineTheme();

  return (
    <Button
      variant="subtle"
      flex={1}
      leftSection={
        <LogOut size={16} color={theme.other["uiColors"].primaryAccent} />
      }
      onClick={logoutFn}
    >
      Wyloguj
    </Button>
  );
};

const UserInfo = ({
  username,
  email,
  isAdmin,
  logoutFn,
  includeThemeSwitcher,
}: {
  username: string;
  email: string;
  isAdmin: boolean;
  logoutFn: () => void;
  includeThemeSwitcher: boolean;
}) => {
  return (
    <Stack
      bd={`1px solid ${uiColors.borderStrong}`}
      bdrs={8}
      justify="space-between"
      gap={0}
    >
      <Stack px={16} py={12} gap={0}>
        <Group align="center" gap={6}>
          {isAdmin && (
            <Box mt={1} component="span">
              <Crown width={16} height={16} />
            </Box>
          )}
          <Text fw={500}>{username}</Text>
        </Group>
        <Text fz={12} c="gray.6">
          {email}
        </Text>
      </Stack>
      <Group
        gap={0}
        style={{ borderTop: `1px solid ${uiColors.borderStrong}` }}
      >
        <LogoutButton logoutFn={logoutFn} />
        {includeThemeSwitcher && <Divider orientation="vertical" />}
        {includeThemeSwitcher && <ThemeSwitcher />}
      </Group>
    </Stack>
  );
};

export const AppFooter = ({
  userInfo,
  kartotekaServiceUrl,
  otherServicesUrl,
  logoutFn,
  includeThemeSwitcher = false,
}: {
  userInfo: {
    username: string;
    email: string;
    isAdmin: boolean;
  };
  kartotekaServiceUrl: string;
  otherServicesUrl: string;
  logoutFn: () => void;
  includeThemeSwitcher?: boolean;
}) => {
  return (
    <Stack mt="auto">
      <Box w="full">
        <OtherServicesMenu
          kartotekaServiceUrl={kartotekaServiceUrl}
          otherServicesUrl={otherServicesUrl}
        />
      </Box>
      <UserInfo
        username={userInfo.username}
        email={userInfo.email}
        isAdmin={userInfo.isAdmin}
        logoutFn={logoutFn}
        includeThemeSwitcher={includeThemeSwitcher}
      />
    </Stack>
  );
};
