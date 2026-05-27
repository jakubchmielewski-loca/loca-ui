import React, { useState } from "react";

import {
  AppShell,
  Badge,
  Button,
  Drawer,
  FileInput,
  Group,
  Divider,
  Modal,
  Paper,
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
import { SearchInput } from "../../src/components/search-input";
import { NoticesProvider, type NoticeItem } from "../../src/components/notices";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const mockNotices: NoticeItem[] = [
  {
    id: 1,
    title: "Nadano nową rolę",
    message:
      'Otrzymałeś rolę "testt" w systemie "Kartoteka" w placówce "Client 2"',
    source: "KARTOTEKA",
    createdAt: "2026-05-26T08:33:13.325Z",
    isUnread: true,
    actionUrl: "/dashboard/organization/2",
  },
  {
    id: 2,
    title: "Zaktualizowano dane organizacji",
    message: "Twoja organizacja została zaktualizowana przez administratora.",
    source: "KARTOTEKA",
    createdAt: "2026-05-25T14:12:00.000Z",
    isUnread: false,
  },
];

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

function PlaygroundContent() {
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
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
              <Navbar.ListItem href="/" Icon={HomeIcon}>
                Secondary
              </Navbar.ListItem>
              <Navbar.ListItem href="/" Icon={HomeIcon} disabled>
                Tertiary
              </Navbar.ListItem>
            </Navbar.List>
          </Navbar.Main>
          <Navbar.Footer>
            <AppFooter
              userInfo={{
                username: "Stanisław Chmielewski",
                email: "stanislaw.chmielewski@example.com",
                isAdmin: true,
              }}
              otherServicesUrl="https://logowanie.loca.pl"
              services={[
                {
                  label: "Kartoteka",
                  url: "https://kartoteka.example.loca.pl",
                },
              ]}
              logoutFn={() => {}}
              includeThemeSwitcher={true}
            />
          </Navbar.Footer>
        </Navbar>
      </AppShell.Navbar>

      <AppShell.Main>
        <PageWrapper>
          <PagePane>
            <Stack gap="lg">
              <Group justify="space-between">
                <Title order={2}>Playground custom components</Title>
              </Group>

              <Group>
                <Button onClick={openModal}>Open modal</Button>
                <Button variant="outline" onClick={openDrawer}>
                  Open drawer
                </Button>
                <Button
                  variant="light"
                  onClick={() =>
                    notifications.show({
                      title: "Test notification",
                      message: "Komponenty wygladaja poprawnie",
                    })
                  }
                >
                  Show notification
                </Button>
              </Group>

              <Paper withBorder p="md">
                <Stack gap="sm">
                  <Title order={4}>Forms & filters</Title>
                  <SearchInput
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                  />
                  <Group grow>
                    <TextInput label="TextInput" placeholder="Wpisz wartosc" />
                    <Select
                      label="Select"
                      placeholder="Wybierz opcje"
                      data={["Option 1", "Option 2", "Option 3"]}
                    />
                    <FileInput label="FileInput" />
                  </Group>
                  <Group>
                    <SegmentedControl
                      data={["Dzisiaj", "Tydzien", "Miesiac"]}
                      defaultValue="Dzisiaj"
                    />
                    <DateSwitcher value={date} onChange={setDate} mode="week" />
                  </Group>
                </Stack>
              </Paper>

              <Paper withBorder p="md">
                <Stack gap="sm">
                  <Title order={4}>Tabs & badges</Title>
                  <Group>
                    <Badge color="green">Active</Badge>
                    <Badge color="orange">Pending</Badge>
                    <Badge color="red">Error</Badge>
                  </Group>
                  <Tabs defaultValue="users">
                    <Tabs.List>
                      <Tabs.Tab value="users">Users</Tabs.Tab>
                      <Tabs.Tab value="roles">Roles</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="users">
                      <Text size="sm" mt="md">
                        Podglad tab panelu users.
                      </Text>
                    </Tabs.Panel>
                    <Tabs.Panel value="roles">
                      <Text size="sm" mt="md">
                        Podglad tab panelu roles.
                      </Text>
                    </Tabs.Panel>
                  </Tabs>
                </Stack>
              </Paper>

              <Paper withBorder p="md">
                <Stack gap="sm">
                  <Title order={4}>Table</Title>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>
                          <AltTableTh
                            text="Position"
                            order={sort}
                            onSort={handleSort}
                          />
                        </Table.Th>
                        <Table.Th>
                          <AltTableTh text="Name" />
                        </Table.Th>
                        <Table.Th>
                          <AltTableTh text="Symbol" />
                        </Table.Th>
                        <Table.Th>
                          <AltTableTh text="Mass" />
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                    <Table.Tfoot>
                      <Table.Tr>
                        <TableFooter
                          total={120}
                          totalPages={12}
                          page={page}
                          setPage={setPage}
                          paginationProps={{ size: "sm" }}
                        />
                      </Table.Tr>
                    </Table.Tfoot>
                  </Table>
                </Stack>
              </Paper>

              <Paper withBorder p="md">
                <Stack gap="sm">
                  <Title order={4}>Stepper & chart</Title>
                  <AltStepper active={active}>
                    <AltStepper.Step label="Krok 1" />
                    <AltStepper.Step label="Krok 2" />
                    <AltStepper.Step label="Krok 3" />
                    <AltStepper.Step label="Krok 4" />
                  </AltStepper>
                  <Group>
                    <Button variant="default" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button onClick={nextStep}>Next</Button>
                  </Group>
                  <Divider />
                  <BarChart
                    h={250}
                    data={data}
                    dataKey="month"
                    series={[
                      { name: "Smartphones", color: "navy.6" },
                      { name: "Laptops", color: "navy.4" },
                      { name: "Tablets", color: "navy.2" },
                    ]}
                  />
                </Stack>
              </Paper>
            </Stack>
          </PagePane>
        </PageWrapper>
      </AppShell.Main>

      <Modal opened={openedModal} onClose={closeModal} title="Modal test">
        <Text size="sm">Podglad customowych styli modala.</Text>
      </Modal>

      <Drawer opened={openedDrawer} onClose={closeDrawer} title="Drawer test">
        <Text size="sm">Podglad customowych styli drawera.</Text>
      </Drawer>
    </AppShell>
  );
}

export function App() {
  return (
    <LocaUiProvider>
      <NoticesProvider
        items={mockNotices}
        onMarkAsRead={(id) => console.log("mark as read", id)}
        onMarkAllAsRead={() => console.log("mark all as read")}
        onNoticeClick={(notice) => console.log("notice clicked", notice)}
      >
        <PlaygroundContent />
      </NoticesProvider>
    </LocaUiProvider>
  );
}
