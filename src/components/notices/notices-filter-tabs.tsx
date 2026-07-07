import { Box } from "@mantine/core";
import { Tabs } from "../tabs";
import type { NoticesTab } from "./types";

export type NoticesFilterTabsProps = {
  activeTab: NoticesTab;
  onTabChange: (tab: NoticesTab) => void;
  totalCount: number;
  unreadCount: number;
};

export const NoticesFilterTabs = ({
  activeTab,
  onTabChange,
  totalCount,
  unreadCount,
}: NoticesFilterTabsProps) => {
  return (
    <Box pt={12}>
      <Tabs
        value={activeTab}
        onChange={(value) => {
          if (value === "all" || value === "unread") {
            onTabChange(value);
          }
        }}
      >
        <Tabs.List px={8}>
          <Tabs.Tab value="all">Wszystkie ({totalCount})</Tabs.Tab>
          <Tabs.Tab value="unread">Nieprzeczytane ({unreadCount})</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  );
};
