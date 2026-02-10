import {
  Box,
  Center,
  Group,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import type { FC, ReactElement, ReactNode } from "react";
import { Children, createContext, isValidElement, useContext } from "react";

import { Check } from "lucide-react";

type AltStepperContextValue = {
  active: number;
  allowNextStepsSelect: boolean;
  onStepClick: ((stepIndex: number) => void) | undefined;
  stepsCount: number;
};

const AltStepperContext = createContext<AltStepperContextValue | null>(null);

function useAltStepperContext(component: string): AltStepperContextValue {
  const ctx = useContext(AltStepperContext);

  if (!ctx) {
    throw new Error(`${component} must be used within AltStepper`);
  }

  return ctx;
}

export type AltStepperProps = {
  active: number;
  onStepClick?: (stepIndex: number) => void;
  allowNextStepsSelect?: boolean;
  children: ReactNode;
};

export type AltStepperStepProps = {
  label?: string;
  description?: string;
  allowStepSelect?: boolean;
  children?: ReactNode;
};

export type AltStepperCompletedProps = {
  children?: ReactNode;
};

function isAltStepperStep(
  child: ReactNode
): child is ReactElement<AltStepperStepProps> {
  return (
    isValidElement(child) &&
    (child.type as any).displayName === "AltStepperStep"
  );
}

function isAltStepperCompleted(
  child: ReactNode
): child is ReactElement<AltStepperCompletedProps> {
  return (
    isValidElement(child) &&
    (child.type as any).displayName === "AltStepperCompleted"
  );
}

type AltStepperCompound = FC<AltStepperProps> & {
  Step: typeof AltStepperStep;
  Completed: typeof AltStepperCompleted;
};

function AltStepperComponent({
  active,
  onStepClick,
  allowNextStepsSelect = true,
  children,
}: AltStepperProps) {
  const theme = useMantineTheme();

  const allChildren = Children.toArray(children);
  const stepChildren = allChildren.filter(isAltStepperStep);
  const completedChild = allChildren.find(isAltStepperCompleted);

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

  const contextValue: AltStepperContextValue = {
    active,
    allowNextStepsSelect,
    onStepClick,
    stepsCount: stepChildren.length,
  };

  const renderContent = () => {
    if (active === stepChildren.length && completedChild) {
      return completedChild.props.children ?? null;
    }

    const currentStep = stepChildren[active];

    if (!currentStep) {
      return null;
    }

    return currentStep.props.children ?? null;
  };

  return (
    <AltStepperContext.Provider value={contextValue}>
      <Stack gap={rem(24)}>
        <Group gap={0}>
          {stepChildren.map((step, index) => {
            const colors = getColors(index);

            const allowByIndex = allowNextStepsSelect || index <= active;
            const isSelectable =
              step.props.allowStepSelect ?? allowByIndex ?? false;

            return (
              <Box key={index} flex={1}>
                <Stack gap={8}>
                  <Group gap={8} align="center">
                    <Box flex={1} h={1} bg={colors.border} />
                    <Center
                      w={32}
                      h={32}
                      bg={colors.bg}
                      style={{
                        borderRadius: "50%",
                        border: `1px solid ${colors.border}`,
                        boxShadow: colors.boxShadow,
                        cursor:
                          onStepClick && isSelectable ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (!onStepClick) return;
                        if (!isSelectable) return;
                        onStepClick(index);
                      }}
                    >
                      <Check color={colors.check} size={16} strokeWidth={3} />
                    </Center>
                    <Box flex={1} h={1} bg={colors.border} />
                  </Group>
                  <Center>
                    <Stack gap={2} align="center">
                      {step.props.label && (
                        <Text
                          c={colors.text}
                          fw={active === index ? 500 : 400}
                          fz={rem(14)}
                        >
                          {step.props.label}
                        </Text>
                      )}
                      {step.props.description && (
                        <Text c="#7A7C7D" fz={rem(12)}>
                          {step.props.description}
                        </Text>
                      )}
                    </Stack>
                  </Center>
                </Stack>
              </Box>
            );
          })}
        </Group>

        <Box>{renderContent()}</Box>
      </Stack>
    </AltStepperContext.Provider>
  );
}

export function AltStepperStep(props: AltStepperStepProps) {
  useAltStepperContext("AltStepperStep");
  return null;
}

AltStepperStep.displayName = "AltStepperStep";

export function AltStepperCompleted(props: AltStepperCompletedProps) {
  useAltStepperContext("AltStepperCompleted");
  return null;
}

AltStepperCompleted.displayName = "AltStepperCompleted";

export const AltStepper = Object.assign(AltStepperComponent, {
  Step: AltStepperStep,
  Completed: AltStepperCompleted,
}) as AltStepperCompound;
