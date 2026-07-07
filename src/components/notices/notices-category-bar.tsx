import { Flex, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { UnreadCountBadge } from "./unread-count-badge";
import type { NoticeCategory } from "./types";

export type NoticesCategoryBarProps = {
  categories: NoticeCategory[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
};

export const NoticesCategoryBar = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: NoticesCategoryBarProps) => {
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];

  if (!selectedCategory) return null;

  return (
    <Group justify="space-between" align="center" p={16} wrap="nowrap">
      <Text fz={14} fw={600} c="dark.9">
        {selectedCategory.label}
      </Text>
      <Menu position="bottom-end" withinPortal={false}>
        <Menu.Target>
          <UnstyledButton aria-label="Zmień kategorię powiadomień">
            <Group gap={6} wrap="nowrap">
              <Text fz={12} fw={600}>
                Zmień
              </Text>
              <UnreadCountBadge count={selectedCategory.unreadCount} />
              <Flex c="navy">
                <ChevronDown size={16} />
              </Flex>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {categories.map((category) => (
            <Menu.Item
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              rightSection={
                category.unreadCount > 0 ? (
                  <UnreadCountBadge count={category.unreadCount} />
                ) : null
              }
            >
              {category.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
