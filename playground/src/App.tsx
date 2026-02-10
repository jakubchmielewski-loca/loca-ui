import React, { useState } from "react";

import { AppShell, Burger, Button, Group, Table } from "@mantine/core";

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
              <AltStepper active={active} onStepClick={setActive}>
                <AltStepper.Step
                  label="First step"
                  description="Create an account"
                >
                  Step 1 content: Create an account
                </AltStepper.Step>
                <AltStepper.Step label="Second step" description="Verify email">
                  Step 2 content: Verify email
                </AltStepper.Step>
                <AltStepper.Step
                  label="Final step"
                  description="Get full access"
                >
                  Step 3 content: Get full access
                </AltStepper.Step>
                <AltStepper.Completed>
                  Completed, click back button to get to previous step
                </AltStepper.Completed>
              </AltStepper>
              <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </PagePane>
          </PageWrapper>
        </AppShell.Main>
      </AppShell>
    </LocaUiProvider>
  );
}
