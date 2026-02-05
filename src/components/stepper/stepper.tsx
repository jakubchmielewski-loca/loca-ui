import { Box, Center, Group, Text, rem, useMantineTheme } from "@mantine/core";

import { Stack } from "../stack";
import { Check } from "lucide-react";

export type StepperStep = {
  label: string;
};

export type StepperProps = {
  steps: StepperStep[];
  active: number;
};

export function Stepper({ steps, active }: StepperProps) {
  const theme = useMantineTheme();

  const getColors = (index: number) => {
    if (active === index) {
      return {
        text: theme.primaryColor,
        check: theme.primaryColor,
        border: theme.primaryColor,
        bg: "transparent",
        boxShadow: `0 0 0 4px #EAF0FB`,
      };
    }

    if (index > active) {
      return {
        text: "#7A7C7D",
        check: "#7A7C7D",
        border: theme.colors.gray[4],
        bg: "transparent",
        boxShadow: "none",
      };
    }

    return {
      text: "#1C1C1C",
      check: theme.white,
      border: theme.primaryColor,
      bg: theme.primaryColor,
      boxShadow: "none",
    };
  };

  return (
    <Group gap={0}>
      {steps.map((step, index) => (
        <Box key={index} flex={1}>
          <Stack gap={8}>
            <Group gap={8} align="center">
              <Box flex={1} h={1} bg={getColors(index).border} />
              <Center
                w={32}
                h={32}
                bg={getColors(index).bg}
                style={{
                  borderRadius: "50%",
                  border: `1px solid ${getColors(index).border}`,
                  boxShadow: getColors(index).boxShadow,
                }}
              >
                <Check
                  color={getColors(index).check}
                  size={16}
                  strokeWidth={3}
                />
              </Center>
              <Box flex={1} h={1} bg={getColors(index).border} />
            </Group>
            <Center>
              <Text c={getColors(index).text} fw={active === index ? 500 : 400}>
                {step.label}
              </Text>
            </Center>
          </Stack>
        </Box>
      ))}
    </Group>
  );
}
