//import type { ReactNode } from 'react';

export type CheckboxAccordionItem = {
  value: string;
  checked: boolean;
};

export type CheckboxAccordionProps = {
  groupName: string;
  items: CheckboxAccordionItem[];
  onItemsChange?: (items: CheckboxAccordionItem[]) => void;
};
