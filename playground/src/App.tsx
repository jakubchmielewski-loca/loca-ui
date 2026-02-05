import React, { useState } from "react";

import { Burger, Center, Stack, TextInput } from "@mantine/core";

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
            <Navbar.Top systemName="e-Kartoteka" />
          </Navbar>
        </AppShell.Navbar>

        <AppShell.Main>
          <div className="fs-[14px] p-[16px]">Main</div>
        </AppShell.Main>
      </AppShell>
    </LocaUiProvider>
  );
}
