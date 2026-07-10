import { Box, Burger, Container, Flex, Group, Title } from "@mantine/core";

type HeaderProps = {
  systemName: string;
  systemIcon?: React.ComponentType<{ width?: number; height?: number }>;
  opened: boolean;
  toggle: () => void;
};

export const Header = ({
  systemName,
  systemIcon,
  opened,
  toggle,
}: HeaderProps) => {
  const SystemIcon = systemIcon;

  return (
    <Box h="100%" style={{ boxShadow: "0px 4px 40px 0px #3C519826" }}>
      <Container h="100%">
        <Group h="100%" justify="space-between" align="center">
          <Group align="center" gap={10}>
            {SystemIcon && <SystemIcon width={32} />}
            <Title fz={18} fw={700}>
              {systemName}
            </Title>
          </Group>
          <Flex
            w={32}
            h={32}
            bg="var(--ui-surface-elevated)"
            justify="center"
            align="center"
            bdrs="xl"
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size={16}
              color="navy"
              lineSize={1.3}
            />
          </Flex>
        </Group>
      </Container>
    </Box>
  );
};
