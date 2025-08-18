import type { ReactNode } from 'react';

export type CheckboxAccordionItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type CheckboxAccordionProps = {
  label: string;
  items: CheckboxAccordionItem[];
  onItemsChange?: (items: CheckboxAccordionItem[]) => void;
  children?: ReactNode;
};
