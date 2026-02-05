import React, { useState } from "react";

import { Center, Stack, TextInput } from "@mantine/core";

import { LocaUiProvider } from "../../src/loca-ui-provider";

import { Modal } from "../../src/modal";
import { Select } from "../../src/select";
import { Table } from "../../src/table";
import { Pagination } from "../../src/pagination";
import { TableFooter } from "../../src/table-footer";
import { SearchInput } from "../../src/search-input";
import { Stepper } from "../../src/stepper";

export function App() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <LocaUiProvider>
      <Stack align="center" h="100vh">
        <Center h="100%">
          <Stack w={700}>
            <Stepper
              active={active}
              steps={[
                { label: "Dane" },
                { label: "Karty" },
                { label: "Dostępy do systemów" },
              ]}
            />
          </Stack>
        </Center>
      </Stack>
    </LocaUiProvider>
  );
}
