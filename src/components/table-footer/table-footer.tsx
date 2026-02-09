import { Group, Pagination, Select, Text } from "@mantine/core";

export const TableFooter = ({ total }: { total: number }) => {
  return (
    <td colSpan={100}>
      <Group px={24} pt={24} justify="space-between" gap={32}>
        <Group align="center" gap={16}>
          <Text fz={14} c="dark.3">
            Pokaż
          </Text>
          <Select w={70} data={["10", "20", "50", "100"]} />
          <Text fz={14} c="dark.3">{`z ${total} wyników`}</Text>
        </Group>
        <Pagination total={total} />
      </Group>
    </td>
  );
};
