import { Box, Text, UnstyledButton } from "@mantine/core";
import type { FC, MouseEvent, ReactElement, ReactNode } from "react";
import { Children, createContext, isValidElement, useContext } from "react";

import { uiColors } from "../loca-ui-provider/theme-tokens";
import type { LucideIcon } from "lucide-react";

type BottomNavigationContextValue = {
  value: number;
  onChange: (event: MouseEvent<HTMLButtonElement>, value: number) => void;
};

const BottomNavigationContext =
  createContext<BottomNavigationContextValue | null>(null);

function useBottomNavigationContext(
  component: string
): BottomNavigationContextValue {
  const ctx = useContext(BottomNavigationContext);

  if (!ctx) {
    throw new Error(`${component} must be used within BottomNavigation`);
  }

  return ctx;
}

export type BottomNavigationProps = {
  value: number;
  onChange: (event: MouseEvent<HTMLButtonElement>, value: number) => void;
  children: ReactNode;
};

export type BottomNavigationItemProps = {
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
};

function isBottomNavigationItem(
  child: ReactNode
): child is ReactElement<BottomNavigationItemProps> {
  return (
    isValidElement(child) &&
    (child.type as { displayName?: string }).displayName ===
      "BottomNavigationItem"
  );
}

function BottomNavigationComponent({
  value,
  onChange,
  children,
}: BottomNavigationProps) {
  const items = Children.toArray(children).filter(isBottomNavigationItem);

  return (
    <BottomNavigationContext.Provider value={{ value, onChange }}>
      <Box
        component="nav"
        display="flex"
        bg={uiColors.lightGray}
        h={48}
        style={{
          boxShadow: "0px -4px 40px 0px #3C519826",
        }}
      >
        {items.map((item, index) => {
          const isActive = value === index;
          const isLast = index === items.length - 1;
          const { label, icon, disabled } = item.props;

          const Icon = icon;

          return (
            <UnstyledButton
              key={index}
              flex={1}
              display="flex"
              disabled={disabled}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                borderRight: isLast
                  ? undefined
                  : `1px solid ${uiColors.borderSubtle}`,
                backgroundColor: isActive
                  ? uiColors.primaryAccentSoftBg
                  : "transparent",
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={(event) => {
                if (disabled) return;
                onChange(event, index);
              }}
            >
              <Box
                c={uiColors.primaryAccent}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={16} />
              </Box>
              <Text
                fz={8}
                fw={isActive ? 600 : 400}
                tt="uppercase"
                c={isActive ? uiColors.primaryAccent : uiColors.textStrong}
                lh={1}
              >
                {label}
              </Text>
            </UnstyledButton>
          );
        })}
      </Box>
    </BottomNavigationContext.Provider>
  );
}

export function BottomNavigationItem(_props: BottomNavigationItemProps) {
  useBottomNavigationContext("BottomNavigation.Item");
  return null;
}

BottomNavigationItem.displayName = "BottomNavigationItem";

type BottomNavigationCompound = FC<BottomNavigationProps> & {
  Item: typeof BottomNavigationItem;
};

export const BottomNavigation = Object.assign(BottomNavigationComponent, {
  Item: BottomNavigationItem,
}) as BottomNavigationCompound;
