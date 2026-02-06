import React, { useState } from "react";

import { Burger, Center, Paper, Stack, TextInput } from "@mantine/core";

import { LocaUiProvider } from "../../src/components/loca-ui-provider";

import { Modal } from "../../src/components/modal";
import { Select } from "../../src/components/select";
import { Table } from "../../src/components/table";
import { Pagination } from "../../src/components/pagination";
import { TableFooter } from "../../src/components/table-footer";
import { SearchInput } from "../../src/components/search-input";
import { Stepper } from "../../src/components/stepper";
import { AppShell } from "../../src/components/app-shell";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../src/components/navbar";
import { HomeIcon } from "lucide-react";
import { AppFooter } from "../../src/components/app-footer";
import { PagePane } from "../../src/components/page-pane";

export function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <LocaUiProvider>
      <AppShell navbarOpened={opened}>
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
          <PagePane>Main</PagePane>
        </AppShell.Main>
      </AppShell>
    </LocaUiProvider>
  );
}
