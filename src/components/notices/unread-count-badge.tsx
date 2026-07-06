import { Flex, Text } from "@mantine/core";

export type UnreadCountBadgeProps = {
  count: number;
};

export const UnreadCountBadge = ({ count }: UnreadCountBadgeProps) => {
  if (count === 0) return null;

  return (
    <Flex justify="center" align="center" bg="#C02237" w={18} h={13} bdrs="xl">
      <Text lh="7px" fz={10} fw={700} c="white">
        {count}
      </Text>
    </Flex>
  );
};
