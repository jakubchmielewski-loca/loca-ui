import { ActionIcon, Group, Text } from "@mantine/core";
import { X } from "lucide-react";
import { useNotices } from "./use-notices";

export const NoticesPanelHeader = () => {
  const { close } = useNotices();

  return (
    <Group
      justify="space-between"
      align="center"
      ps={16}
      pe={8}
      py={12}
      wrap="nowrap"
    >
      <Text fz={18} fw={500} ff="heading" c="navy">
        Powiadomienia
      </Text>
      <ActionIcon
        variant="subtle"
        size={24}
        c="navy"
        onClick={close}
        aria-label="Zamknij powiadomienia"
      >
        <X size={20} />
      </ActionIcon>
    </Group>
  );
};
