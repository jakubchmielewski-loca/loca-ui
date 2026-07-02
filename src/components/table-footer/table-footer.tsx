import {
  Box,
  Flex,
  Group,
  Pagination,
  rem,
  Select,
  Text,
  type PaginationProps,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { uiColors } from "../loca-ui-provider/theme-tokens";

export const TableFooter = ({
  total,
  totalPages,
  page,
  setPage,
  itemsPerPage,
  setItemsPerPage,
  paginationProps,
}: {
  total: number;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage?: number;
  setItemsPerPage?: (itemsPerPage: number) => void;
  paginationProps?: Partial<PaginationProps>;
}) => {
  const isCompact = useMediaQuery("(max-width: 48em)");

  return (
    <Box
      px={24}
      pt={24}
      style={{
        borderTop: `${rem(2)} solid ${uiColors.tableBodyBorder}`,
      }}
    >
      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        justify={{ base: "center", sm: "space-between" }}
        align="center"
        gap={{ base: 16, sm: 32 }}
      >
        {itemsPerPage && setItemsPerPage && (
          <Group align="center" gap={16} justify="center">
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
        )}
        <Pagination
          total={totalPages}
          value={page}
          onChange={setPage}
          siblings={isCompact ? 0 : 1}
          boundaries={isCompact ? 0 : 1}
          {...paginationProps}
        />
      </Flex>
    </Box>
  );
};
