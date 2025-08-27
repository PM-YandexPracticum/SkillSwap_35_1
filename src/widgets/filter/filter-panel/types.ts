import type { IFilters } from '@shared-types/IFilters';

export type FilterPanelProps = {
  filters: IFilters;
  onChange: (filters: IFilters) => void;
  onReset: () => void;
}