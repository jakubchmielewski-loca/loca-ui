import { Tabs as MantineTabs } from "@mantine/core";

import { TabsList } from "./tabs-list";

export const Tabs = MantineTabs;

Tabs.List = TabsList as typeof MantineTabs.List;
