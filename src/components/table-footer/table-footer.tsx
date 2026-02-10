import { Group, Pagination, Select, Text } from "@mantine/core";

export const TableFooter = ({
  total,
  totalPages,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}: {
  total: number;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}) => {
  return (
    <td colSpan={100}>
      <Group px={24} pt={24} justify="space-between" gap={32}>
        <Group align="center" gap={16}>
          <Text fz={14} c="dark.3">
            Pokaż
          </Text>
          <Select
            w={70}
            data={["10", "20", "50", "100"]}
            value={itemsPerPage.toString()}
            onChange={(value) => setItemsPerPage(Number(value))}
          />
          <Text fz={14} c="dark.3">{`z ${total} wyników`}</Text>
        </Group>
        <Pagination total={totalPages} value={page} onChange={setPage} />
      </Group>
    </td>
  );
};
