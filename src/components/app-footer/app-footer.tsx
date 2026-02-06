import { Box, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { Crown, Grid2x2, LogOut } from "lucide-react";

const BackToOtherSerivcesButton = ({ url }: { url: string }) => {
  const theme = useMantineTheme();

  return (
    <button
      className="flex p-[16px] items-center justify-center gap-[12px] text-center border border-[#DEE8EF] rounded-[8px] cursor-pointer hover:bg-[#EAF0FB] transition-all duration-300"
      onClick={() => (window.location.href = url)}
    >
      <Box c={theme.primaryColor}>
        <Grid2x2 />
      </Box>
      <Text fz={14} fw={600}>
        Przejdź do innej usługi
      </Text>
    </button>
  );
};

const LogoutButton = ({ logoutFn }: { logoutFn: () => void }) => {
  return (
    <Group
      className="cursor-pointer hover:bg-[#EAF0FB] px-[16px] py-[12px] transition-all duration-300"
      onClick={logoutFn}
      gap={8}
    >
      <LogOut className="text-[#2C4E97] w-[16px]" />
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
    <Stack
      className="border border-[#DEE8EF] rounded-[8px]"
      justify="space-between"
      gap={0}
    >
      <Stack className="px-[16px] py-[12px]" gap={0}>
        <Group align="center" gap={6}>
          {isAdmin && <Crown className="mt-0.25" width={16} />}
          <Text fw={500}>{username}</Text>
        </Group>
        <Text fz={12} c="gray.6">
          {email}
        </Text>
      </Stack>
      <Stack className="border-t border-[#DEE8EF]">
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
    <Stack className="mt-auto">
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
