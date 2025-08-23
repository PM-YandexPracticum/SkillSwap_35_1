import type { ReactNode } from 'react';

export type CheckboxAccordionItem = {
  id: string;
  label: string;
  value: string;
  checked: boolean;
};

export type CheckboxAccordionProps = {
  label: string;
  groupName: string;
  items: CheckboxAccordionItem[];
  onItemsChange?: (items: CheckboxAccordionItem[]) => void;
  children?: ReactNode;
};
