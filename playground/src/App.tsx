import React, { useState } from "react";

import {
  AppShell,
  Badge,
  Burger,
  Button,
  Drawer,
  FileInput,
  Group,
  Modal,
  Scroller,
  SegmentedControl,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { BarChart } from "@mantine/charts";

import { LocaUiProvider } from "../../src/components/loca-ui-provider";

import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../src/components/navbar";
import { HomeIcon } from "lucide-react";
import { AppFooter } from "../../src/components/app-footer";
import { PagePane } from "../../src/components/page-pane";
import { PageWrapper } from "../../src/components/page-wrapper";
import { AltTableTh } from "../../src/components/alt-table-th";
import { AltStepper } from "../../src/components/alt-stepper";
import { TableFooter } from "../../src/components/table-footer";
import { notifications } from "@mantine/notifications";
import { DateSwitcher } from "../../src/components/date-switcher";
import useNavbar from "../../src/hooks/use-navbar";
import { Header } from "../../src/components/header";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

export function App() {
  const { opened, toggle } = useNavbar();
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSort = () => {
    if (sort === "asc") {
      setSort("desc");
    } else if (sort === "desc") {
      setSort(null);
    } else {
      setSort("asc");
    }
  };

  const [date, setDate] = useState(new Date());

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <LocaUiProvider>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Header systemName="e-Kartoteka" opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar>
            <Navbar.Header systemName="e-Kartoteka" />
            <Navbar.Main>
              <Navbar.List>
                <Navbar.ListItem href="/" Icon={HomeIcon} isActive>
                  Main
                </Navbar.ListItem>
                <Navbar.ListItem href="/" Icon={HomeIcon} disabled>
                  Secondary
                </Navbar.ListItem>
              </Navbar.List>
            </Navbar.Main>
            <Navbar.Footer>
              <AppFooter
                userInfo={{
                  username: "John Doe",
                  email: "john.doe@example.com",
                  isAdmin: false,
                }}
                otherServicesUrl="https://logowanie.loca.pl"
                logoutFn={() => {}}
              />
            </Navbar.Footer>
          </Navbar>
        </AppShell.Navbar>

        <AppShell.Main>
          <PageWrapper>
            <PagePane>
              <Stack gap="md" align="center">
                <Scroller maw={400}>
                  <Group gap="xs" wrap="nowrap">
                    {Array.from({ length: 25 }).map((_, index) => (
                      <Text key={index}>Badge {index + 1}</Text>
                    ))}
                  </Group>
                </Scroller>

                <BarChart
                  h={300}
                  data={data}
                  dataKey="month"
                  series={[
                    { name: "Smartphones", color: "violet.6" },
                    { name: "Laptops", color: "blue.6" },
                    { name: "Tablets", color: "teal.6" },
                  ]}
                  tickLine="y"
                />

                <Button variant="default" onClick={openModal}>
                  Open modal
                </Button>

                <Drawer opened={openedDrawer} onClose={closeDrawer}>
                  <Title order={2}>Authentication</Title>
                </Drawer>

                <Button variant="default" onClick={openDrawer}>
                  Open Drawer
                </Button>

                <SegmentedControl data={["Segment1", "Segment2", "Segment3"]} />
                <DateSwitcher value={date} onChange={setDate} mode="week" />
                <TextInput label="Text input" placeholder="Enter text" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
                <FileInput label="File input" />
              </Stack>
            </PagePane>
          </PageWrapper>
        </AppShell.Main>
      </AppShell>
    </LocaUiProvider>
  );
}
