import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Crown, Grid2x2, LogOut, Moon, Sun } from "lucide-react";
import { uiColors } from "../loca-ui-provider/theme-tokens";

const BackToOtherSerivcesButton = ({ url }: { url: string }) => {
  const theme = useMantineTheme();

  return (
    <Box w="full" bd={`1px solid ${uiColors.borderStrong}`} bdrs={8}>
      <Button
        variant="subtle"
        fullWidth
        h={58}
        leftSection={<Grid2x2 color={theme.other["uiColors"].primaryAccent} />}
        onClick={() => (window.location.href = url)}
      >
        Przejdź do innej usługi
      </Button>
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
  otherServicesUrl,
  logoutFn,
  includeThemeSwitcher = false,
}: {
  userInfo: {
    username: string;
    email: string;
    isAdmin: boolean;
  };
  otherServicesUrl: string;
  logoutFn: () => void;
  includeThemeSwitcher?: boolean;
}) => {
  return (
    <Stack mt="auto">
      <Box w="full">
        <BackToOtherSerivcesButton url={otherServicesUrl} />
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
