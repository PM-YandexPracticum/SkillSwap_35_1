import type { IFilters } from '@shared-types/types';

export type FilterPanelProps = {
  filters: IFilters;
  onChange: (filters: IFilters) => void;
  onReset: () => void;
}