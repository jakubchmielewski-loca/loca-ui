import {
  Box,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { Crown, Grid2x2, LogOut } from "lucide-react";

const BackToOtherSerivcesButton = ({ url }: { url: string }) => {
  const theme = useMantineTheme();

  return (
    <UnstyledButton
      data-footer-back-button
      display="flex"
      p={16}
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      bd="1px solid #DEE8EF"
      bdrs={8}
      onClick={() => (window.location.href = url)}
    >
      <Box c={theme.primaryColor}>
        <Grid2x2 />
      </Box>
      <Text fz={14} fw={600}>
        Przejdź do innej usługi
      </Text>
    </UnstyledButton>
  );
};

const LogoutButton = ({ logoutFn }: { logoutFn: () => void }) => {
  return (
    <Group
      data-footer-logout
      px={16}
      py={12}
      gap={8}
      style={{ cursor: "pointer", transition: "all 0.3s" }}
      onClick={logoutFn}
    >
      <Box
        c="#2C4E97"
        component="span"
        style={{ display: "inline-flex", lineHeight: 0 }}
      >
        <LogOut size={16} />
      </Box>
      <Text fz={14}>Wyloguj</Text>
    </Group>
  );
};

const UserInfo = ({
  username,
  email,
  isAdmin,
  logoutFn,
}: {
  username: string;
  email: string;
  isAdmin: boolean;
  logoutFn: () => void;
}) => {
  return (
    <Stack bd="1px solid #DEE8EF" bdrs={8} justify="space-between" gap={0}>
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
      <Stack style={{ borderTop: "1px solid #DEE8EF" }} gap={0}>
        <LogoutButton logoutFn={logoutFn} />
      </Stack>
    </Stack>
  );
};

export const AppFooter = ({
  userInfo,
  otherServicesUrl,
  logoutFn,
}: {
  userInfo: {
    username: string;
    email: string;
    isAdmin: boolean;
  };
  otherServicesUrl: string;
  logoutFn: () => void;
}) => {
  return (
    <Stack mt="auto">
      <BackToOtherSerivcesButton url={otherServicesUrl} />
      <UserInfo
        username={userInfo.username}
        email={userInfo.email}
        isAdmin={userInfo.isAdmin}
        logoutFn={logoutFn}
      />
    </Stack>
  );
};
