import {
  Scroller,
  TabsList as MantineTabsList,
  type TabsListProps,
  Box,
} from "@mantine/core";

export const TabsList = (props: TabsListProps) => {
  return (
    <Box pos="relative" style={{ zIndex: 1 }}>
      <Scroller>
        <MantineTabsList {...props} />
      </Scroller>
      <Box
        pos="absolute"
        bottom={0}
        left={0}
        right={0}
        h={2}
        bg="var(--tab-border-color)"
        style={{
          zIndex: -1,
        }}
      />
    </Box>
  );
};
