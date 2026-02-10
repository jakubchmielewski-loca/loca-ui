import React, { useState } from "react";

import { AppShell, Burger, Table } from "@mantine/core";

import { LocaUiProvider } from "../../src/components/loca-ui-provider";

import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../src/components/navbar";
import { HomeIcon } from "lucide-react";
import { AppFooter } from "../../src/components/app-footer";
import { PagePane } from "../../src/components/page-pane";
import { PageWrapper } from "../../src/components/page-wrapper";
import { AltTableTh } from "../../src/components/alt-table-th";
import { TableFooter } from "../../src/components/table-footer";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export function App() {
  const [opened, { toggle }] = useDisclosure();
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  console.log(page, itemsPerPage);

  const handleSort = () => {
    if (sort === "asc") {
      setSort("desc");
    } else if (sort === "desc") {
      setSort(null);
    } else {
      setSort("asc");
    }
  };

  return (
    <LocaUiProvider>
      <AppShell>
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <div>Logo</div>
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
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <AltTableTh
                        text="Element position"
                        order={sort}
                        onSort={handleSort}
                      />
                    </Table.Th>
                    <Table.Th>
                      <AltTableTh text="Element name" />
                    </Table.Th>
                    <Table.Th>
                      <AltTableTh text="Symbol" />
                    </Table.Th>
                    <Table.Th>
                      <AltTableTh text="Atomic mass" />
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {elements.map((element) => (
                    <Table.Tr key={element.name}>
                      <Table.Td>{element.position}</Table.Td>
                      <Table.Td>{element.name}</Table.Td>
                      <Table.Td>{element.symbol}</Table.Td>
                      <Table.Td>{element.mass}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
                <TableFooter
                  total={elements.length}
                  totalPages={10}
                  page={page}
                  setPage={setPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
              </Table>
            </PagePane>
          </PageWrapper>
        </AppShell.Main>
      </AppShell>
    </LocaUiProvider>
  );
}
