"use client";

import { Popover, useMatches, type PopoverProps } from "@mantine/core";
import type { ReactElement } from "react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { ServicesPanel } from "./services-panel";
import { useServices } from "./use-services";

export type ServicesPopoverProps = {
  children: ReactElement;
  position?: PopoverProps["position"];
};

export const ServicesPopover = ({ children }: ServicesPopoverProps) => {
  const { isOpen, open, close } = useServices();

  const position: PopoverProps["position"] = useMatches({
    base: "bottom-start",
    sm: "right-end",
  });

  return (
    <Popover
      opened={isOpen}
      onChange={(opened) => (opened ? open() : close())}
      position={position}
      width={340}
      shadow="md"
      radius={8}
      withinPortal
      offset={4}
      trapFocus={false}
      zIndex={400}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown
        p={0}
        bd={`1px solid ${uiColors.borderSubtle}`}
        style={{ overflow: "hidden" }}
      >
        <ServicesPanel />
      </Popover.Dropdown>
    </Popover>
  );
};
