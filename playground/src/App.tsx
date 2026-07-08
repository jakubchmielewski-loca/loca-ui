import React, { useMemo, useState } from "react";

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
  Text,
  TextInput,
  Title,
  Textarea,
} from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { BarChart } from "@mantine/charts";
import { Carousel } from "@mantine/carousel";

import { LocaUiProvider } from "../../src/components/loca-ui-provider";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Navbar } from "../../src/components/navbar";
import {
  Calendar,
  HomeIcon,
  ListChecks,
  Map,
  MessageCircleWarning,
} from "lucide-react";
import { AppFooter, AppFooterProvider } from "../../src/components/app-footer";
import { BottomNavigation } from "../../src/components/bottom-navigation";
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
import {
  NoticesProvider,
  buildNoticeCategories,
  type NoticeCategory,
  type NoticeItem,
  type NoticesTab,
  useNoticesPanelState,
} from "../../src/components/notices";
import { SearchSelect } from "../../src/components/search-select";
import { DetailedSelect } from "../../src/components/detailed-select";
import { ContextSelect } from "../../src/components/context-select";
import { PageBreadcrumbs } from "../../src/components/page-breadcrumbs";
import { PhotoTiles } from "../../src/components/photo-tiles";
import { Tabs } from "../../src";

const photoTilesItems = [
  {
    src: "https://placehold.co/600x400",
    title: "Dziura w panelu",
    fileName: "1773233568061(...).jpg",
  },
  {
    src: "https://placehold.co/600x400/png",
    title: "Dziura w panelu",
    fileName: "1773233568062(...).jpg",
  },
  {
    src: "https://placehold.co/600x400/jpg",
    title: "Uszkodzenie okna",
    fileName: "1773233568063(...).jpg",
  },
  {
    src: "https://placehold.co/600x400/webp",
    title: "Pęknięcie ściany",
    fileName: "1773233568064(...).jpg",
  },
];

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

type MockNotice = NoticeItem & { categoryId: string };

const mockCategoryDefs: Omit<NoticeCategory, "unreadCount">[] = [
  { id: "kd", label: "Kontrola Dostępu" },
  { id: "krt", label: "Kartoteka" },
];

const allMockNotices: MockNotice[] = [
  {
    id: 1,
    categoryId: "kd",
    message:
      "Wielokrotna próba nieudanego wyjścia przez użytkownika Janek Uczniowski, drzwi: HG1 - Główne wejście do szkoły",
    createdAt: "2026-05-26T08:11:49.000Z",
    isUnread: true,
  },
  {
    id: 2,
    categoryId: "kd",
    message:
      "Wielokrotna próba nieudanego wyjścia przez użytkownika Janek Uczniowski, drzwi: HG1 - Główne wejście do szkoły",
    createdAt: "2026-05-26T08:11:49.000Z",
    isUnread: false,
  },
  {
    id: 3,
    categoryId: "kd",
    message:
      "Wielokrotna próba nieudanego wyjścia przez użytkownika Janek Uczniowski, drzwi: HG1 - Główne wejście do szkoły",
    createdAt: "2026-05-26T08:11:49.000Z",
    isUnread: false,
  },
  {
    id: 4,
    categoryId: "kd",
    message:
      "Wielokrotna próba nieudanego wyjścia przez użytkownika Janek Uczniowski, drzwi: HG1 - Główne wejście do szkoły",
    createdAt: "2026-05-26T08:11:49.000Z",
    isUnread: false,
  },
  {
    id: 5,
    categoryId: "kd",
    message:
      "Wielokrotna próba nieudanego wyjścia przez użytkownika Janek Uczniowski, drzwi: HG1 - Główne wejście do szkoły",
    createdAt: "2026-05-26T08:11:49.000Z",
    isUnread: false,
  },
  {
    id: 6,
    categoryId: "kd",
    message: "Nieautoryzowane otwarcie drzwi: Magazyn - budynek B",
    createdAt: "2026-05-25T16:42:10.000Z",
    isUnread: false,
  },
  ...Array.from({ length: 18 }, (_, index) => ({
    id: 100 + index,
    categoryId: "kd" as const,
    message: `Historyczne zdarzenie KD #${index + 1}`,
    createdAt: "2026-05-20T10:00:00.000Z",
    isUnread: false,
  })),
  {
    id: 201,
    categoryId: "krt",
    message:
      'Nadano nową rolę "testt" w systemie "Kartoteka" w placówce "Client 2"',
    createdAt: "2026-05-26T08:33:13.325Z",
    isUnread: true,
  },
  {
    id: 202,
    categoryId: "krt",
    message: "Twoja organizacja została zaktualizowana przez administratora.",
    createdAt: "2026-05-25T14:12:00.000Z",
    isUnread: true,
  },
];

const NOTICES_PREVIEW_LIMIT = 5;

function PlaygroundNoticesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notices, setNotices] = useState(allMockNotices);

  const categories = useMemo(
    () =>
      buildNoticeCategories(notices, mockCategoryDefs, {
        fallbackDefinition: mockCategoryDefs[0],
      }),
    [notices]
  );

  const panelState = useNoticesPanelState({
    notices,
    categories,
    defaultCategoryId: "kd",
    previewLimit: NOTICES_PREVIEW_LIMIT,
  });

  return (
    <NoticesProvider
      items={panelState.items}
      categories={panelState.categories}
      selectedCategoryId={panelState.selectedCategoryId}
      onCategoryChange={panelState.onCategoryChange}
      activeTab={panelState.activeTab}
      onTabChange={panelState.onTabChange}
      totalCount={panelState.totalCount}
      unreadCount={panelState.unreadCount}
      globalUnreadCount={panelState.globalUnreadCount}
      onMarkAsRead={(id) =>
        setNotices((prev) =>
          prev.map((notice) =>
            notice.id === id ? { ...notice, isUnread: false } : notice
          )
        )
      }
      onMarkAllAsRead={() =>
        setNotices((prev) =>
          prev.map((notice) =>
            notice.categoryId === panelState.selectedCategoryId
              ? { ...notice, isUnread: false }
              : notice
          )
        )
      }
      onDelete={(id) =>
        setNotices((prev) => prev.filter((notice) => notice.id !== id))
      }
      onNoticeClick={(notice) => console.log("notice clicked", notice)}
      onViewAll={() => console.log("view all notices")}
    >
      {children}
    </NoticesProvider>
  );
}

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

const schoolOptions = [
  {
    value: "1",
    label: "Szkoła Podstawowa nr 1",
    description: "ul. Kwiatowa 12, Warszawa",
  },
  {
    value: "2",
    label: "Szkoła Podstawowa nr 1",
    description: "ul. Słoneczna 4, Kraków",
  },
  {
    value: "3",
    label: "Szkoła Podstawowa nr 2",
    description: "ul. Leśna 8, Gdańsk",
  },
];

const contextOptions = [
  { key: "school-mm", title: "Szkoła MM", subtitle: "Administrator" },
  {
    key: "school-sp1",
    title: "Szkoła Podstawowa nr 1",
    subtitle: "Nauczyciel",
  },
  { key: "school-sp2", title: "Szkoła Podstawowa nr 2", subtitle: "Dyrektor" },
  { key: "kindergarten", title: "Przedszkole Słoneczko", subtitle: "Opiekun" },
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
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [contextKey, setContextKey] = useState("school-mm");
  const [page, setPage] = useState(1);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const isMobile = useMediaQuery("(max-width: 48em)");

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
          <Navbar.Header systemName="e-Kartoteka">
            <ContextSelect
              options={contextOptions}
              value={contextKey}
              onChange={(key) => setContextKey(key)}
            />
          </Navbar.Header>
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
              <Navbar.ListGroup title="Wsparcie dla usług">
                <Navbar.ListItem href="/" Icon={HomeIcon}>
                  Item 1
                </Navbar.ListItem>
                <Navbar.ListItem href="/" Icon={HomeIcon}>
                  Item 2
                </Navbar.ListItem>
                <Navbar.ListItem href="/" Icon={HomeIcon}>
                  Item 3
                </Navbar.ListItem>
              </Navbar.ListGroup>
            </Navbar.List>
          </Navbar.Main>
          <Navbar.Footer>
            <AppFooterProvider
              user={{
                username: "Damian Kiliszek",
                email: "dkiliszek@live.com",
                isAdmin: false,
              }}
              serviceCodes={["KD", "KRT", "RCP", "SRV_OPS", "ESW"]}
              onLogout={() => {}}
            >
              <AppFooter />
            </AppFooterProvider>
          </Navbar.Footer>
        </Navbar>
      </AppShell.Navbar>

      <AppShell.Main>
        <PageWrapper>
          <PageBreadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Instalacje", href: "/test" },
              { label: "[#14] Wejście na kartę do sali 217" },
            ]}
          />
          <PagePane>
            {bottomNavValue === 1 && isMobile && (
              <Stack gap="lg">
                <Title order={2}>Mapa</Title>
                <Text size="sm" c="dimmed">
                  Widok mapy — nawigacja dolna na mobile przełącza sekcje
                  aplikacji.
                </Text>
                <Paper withBorder p="md" h={320}>
                  <Text ta="center" c="dimmed" mt={120}>
                    Podgląd mapy
                  </Text>
                </Paper>
              </Stack>
            )}

            {bottomNavValue === 2 && isMobile && (
              <Stack gap="lg">
                <Title order={2}>Kalendarz</Title>
                <Text size="sm" c="dimmed">
                  Widok kalendarza.
                </Text>
                <Paper withBorder p="md">
                  <DatePicker />
                </Paper>
              </Stack>
            )}

            {bottomNavValue === 3 && isMobile && (
              <Stack gap="lg">
                <Title order={2}>Problemy</Title>
                <Text size="sm" c="dimmed">
                  Lista zgłoszonych problemów.
                </Text>
                <Paper withBorder p="md">
                  <Stack gap="sm">
                    <Text fw={500}>Dziura w panelu</Text>
                    <Text size="sm" c="dimmed">
                      Sala 217 — zgłoszono 2 dni temu
                    </Text>
                    <Divider />
                    <Text fw={500}>Uszkodzenie okna</Text>
                    <Text size="sm" c="dimmed">
                      Korytarz — zgłoszono 5 dni temu
                    </Text>
                  </Stack>
                </Paper>
              </Stack>
            )}

            {(bottomNavValue === 0 || !isMobile) && (
              <Stack gap="lg">
                <Group justify="space-between">
                  <Title order={2}>Playground custom components</Title>
                </Group>

                <Group>
                  <Button size="xs" onClick={openModal}>
                    Open modal
                  </Button>
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
                    <Group w="full">
                      <SearchInput
                        bg="#fff"
                        placeholder="Search"
                        value={search}
                        onChange={(event) =>
                          setSearch(event.currentTarget.value)
                        }
                        flex={1}
                      />
                      <SearchSelect
                        bg="#fff"
                        placeholder="Filter by"
                        data={["Option 1", "Option 2", "Option 3"]}
                      />
                    </Group>
                    <Group>
                      <DateInput
                        value={date}
                        onChange={(date) =>
                          setDate(new Date(date ?? new Date()))
                        }
                      />
                    </Group>
                    <Group grow>
                      <TextInput
                        label="TextInput"
                        placeholder="Wpisz wartosc"
                        readOnly
                      />
                      <Select
                        label="Select"
                        placeholder="Wybierz opcje"
                        data={["Option 1", "Option 2", "Option 3"]}
                      />
                      <FileInput label="FileInput" />
                    </Group>
                    <Group grow>
                      <DetailedSelect
                        label="Placówka"
                        placeholder="Wybierz placówkę"
                        data={schoolOptions}
                        value={schoolId}
                        onChange={setSchoolId}
                        clearable
                      />
                      <Textarea label="Textarea" placeholder="Wpisz wartosc" />
                    </Group>
                    <Group>
                      <SegmentedControl
                        data={["Dzisiaj", "Tydzien", "Miesiac"]}
                        defaultValue="Dzisiaj"
                      />
                      <DateSwitcher
                        value={date}
                        onChange={setDate}
                        mode="day"
                      />
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
                        <Tabs.Tab value="settings">Settings</Tabs.Tab>
                        <Tabs.Tab value="permissions">Permissions</Tabs.Tab>
                        <Tabs.Tab value="logs">Logs</Tabs.Tab>
                        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
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
                      <Tabs.Panel value="settings">
                        <Text size="sm" mt="md">
                          Podglad tab panelu settings.
                        </Text>
                      </Tabs.Panel>
                      <Tabs.Panel value="permissions">
                        <Text size="sm" mt="md">
                          Podglad tab panelu permissions.
                        </Text>
                      </Tabs.Panel>
                      <Tabs.Panel value="logs">
                        <Text size="sm" mt="md">
                          Podglad tab panelu logs.
                        </Text>
                      </Tabs.Panel>
                      <Tabs.Panel value="notifications">
                        <Text size="sm" mt="md">
                          Podglad tab panelu notifications.
                        </Text>
                      </Tabs.Panel>
                    </Tabs>
                  </Stack>
                </Paper>

                <Paper withBorder p="md">
                  <Stack gap="sm">
                    <Title order={4}>Table</Title>
                    <Stack gap={0}>
                      <Table.ScrollContainer minWidth={600} type="native">
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
                        </Table>
                      </Table.ScrollContainer>
                      <TableFooter
                        total={120}
                        totalPages={12}
                        page={page}
                        setPage={setPage}
                        itemsPerPage={10}
                        setItemsPerPage={() => {}}
                      />
                    </Stack>
                  </Stack>
                </Paper>

                <Paper withBorder p="md">
                  <Stack gap="sm">
                    <Title order={4}>Photo tiles lightbox</Title>
                    <Text size="sm" c="dimmed">
                      Kliknij kafelek, aby otworzyć podgląd zdjęcia w
                      lightboxie.
                    </Text>
                    <PhotoTiles>
                      <PhotoTiles.Grid>
                        {photoTilesItems.map((item, index) => (
                          <PhotoTiles.Tile
                            key={index}
                            index={index}
                            src={item.src}
                            title={item.title}
                            fileName={item.fileName}
                          />
                        ))}
                      </PhotoTiles.Grid>
                    </PhotoTiles>
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

                <Paper withBorder p="md">
                  <Carousel withIndicators height={200}>
                    <Carousel.Slide>1</Carousel.Slide>
                    <Carousel.Slide>2</Carousel.Slide>
                    <Carousel.Slide>3</Carousel.Slide>
                    {/* ...other slides */}
                  </Carousel>
                </Paper>
              </Stack>
            )}
          </PagePane>
        </PageWrapper>
      </AppShell.Main>

      <AppShell.Footer hiddenFrom="sm">
        <BottomNavigation
          value={bottomNavValue}
          onChange={(_event, newValue) => {
            setBottomNavValue(newValue);
          }}
        >
          <BottomNavigation.Item label="Zadania" icon={ListChecks} />
          <BottomNavigation.Item label="Mapa" icon={Map} />
          <BottomNavigation.Item label="Kalendarz" icon={Calendar} />
          <BottomNavigation.Item label="Problemy" icon={MessageCircleWarning} />
        </BottomNavigation>
      </AppShell.Footer>

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
      <PlaygroundNoticesProvider>
        <PlaygroundContent />
      </PlaygroundNoticesProvider>
    </LocaUiProvider>
  );
}
