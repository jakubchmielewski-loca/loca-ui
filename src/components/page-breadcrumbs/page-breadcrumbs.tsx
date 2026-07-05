import {
  Anchor,
  Box,
  Breadcrumbs,
  ScrollArea,
  Scroller,
  Text,
  useMantineTheme,
  useMatches,
} from "@mantine/core";
import { ChevronRight } from "lucide-react";

export type PageBreadcrumbsProps = {
  LinkComponent?: React.ElementType;
  items: {
    label: string;
    href?: string;
  }[];
};

const Item = ({
  label,
  href,
  LinkComponent,
}: {
  label: string;
  href: string | undefined;
  LinkComponent: React.ElementType;
}) => {
  const theme = useMantineTheme();

  if (href) {
    return (
      <Box fw={600} c={theme.other["uiColors"].textPrimary}>
        <LinkComponent
          href={href}
          fz={{ base: 12, md: 14, xl: 16 }}
          style={{ whiteSpace: "nowrap" }}
        >
          {label}
        </LinkComponent>
      </Box>
    );
  }

  return (
    <Text
      c="#AAAAAA"
      fz={{ base: 12, md: 14, xl: 16 }}
      fw={600}
      style={{ whiteSpace: "nowrap" }}
    >
      {label}
    </Text>
  );
};

export const PageBreadcrumbs = ({
  LinkComponent = Anchor,
  items,
}: PageBreadcrumbsProps) => {
  const chevronSize = useMatches({
    base: 12,
    md: 14,
    xl: 18,
  });

  return (
    <ScrollArea type="never">
      <Breadcrumbs
        separatorMargin={4}
        separator={
          <ChevronRight color="#AAAAAA" size={chevronSize} strokeWidth={2} />
        }
        style={{ flexWrap: "nowrap" }}
      >
        {items.map((item) => (
          <Item
            key={item.label}
            label={item.label}
            href={item.href}
            LinkComponent={LinkComponent}
          />
        ))}
      </Breadcrumbs>
    </ScrollArea>
  );
};
