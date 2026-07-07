"use client";

import { Popover, type PopoverProps } from "@mantine/core";
import type { ReactElement } from "react";
import { uiColors } from "../loca-ui-provider/theme-tokens";
import { NoticesPanel } from "./notices-panel";
import { useNotices } from "./use-notices";

export type NoticesPopoverProps = {
  children: ReactElement;
  position?: PopoverProps["position"];
};

export const NoticesPopover = ({
  children,
  position = "right-end",
}: NoticesPopoverProps) => {
  const { isOpen, open, close } = useNotices();

  return (
    <Popover
      opened={isOpen}
      onChange={(opened) => (opened ? open() : close())}
      position={position}
      width={360}
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
        <NoticesPanel />
      </Popover.Dropdown>
    </Popover>
  );
};
