import { Anchor, Breadcrumbs, Text, useMantineTheme } from "@mantine/core";
import { ChevronRight } from "lucide-react";

export type PageBreadcrumbsProps = {
  items: {
    label: string;
    href?: string;
  }[];
};

const Item = ({ label, href }: { label: string; href: string | undefined }) => {
  const theme = useMantineTheme();

  if (href) {
    return (
      <Anchor href={href} fw={600} c={theme.other["uiColors"].textPrimary}>
        {label}
      </Anchor>
    );
  }

  return (
    <Text c="#AAAAAA" fw={600}>
      {label}
    </Text>
  );
};

export const PageBreadcrumbs = ({ items }: PageBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      separatorMargin={4}
      separator={<ChevronRight color="#AAAAAA" size={18} strokeWidth={2} />}
      mb={24}
    >
      {items.map((item) => (
        <Item key={item.label} label={item.label} href={item.href} />
      ))}
    </Breadcrumbs>
  );
};
