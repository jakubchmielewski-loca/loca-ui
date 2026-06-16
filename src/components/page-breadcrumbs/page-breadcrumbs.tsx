import { Anchor, Breadcrumbs, Text, useMantineTheme } from "@mantine/core";
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
      <LinkComponent
        href={href}
        fw={600}
        c={theme.other["uiColors"].textPrimary}
      >
        {label}
      </LinkComponent>
    );
  }

  return (
    <Text c="#AAAAAA" fw={600}>
      {label}
    </Text>
  );
};

export const PageBreadcrumbs = ({
  LinkComponent = Anchor,
  items,
}: PageBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      separatorMargin={4}
      separator={<ChevronRight color="#AAAAAA" size={18} strokeWidth={2} />}
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
  );
};
