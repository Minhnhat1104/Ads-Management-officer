import { ListPaginationProps } from './ListPagination';

export interface BaseListProps {
  checkedIds?: string[];
  onRowChecked?: (ids: string[]) => void;
  pagingProps?: ListPaginationProps;
  onPageChange?: (page: number, size: number) => void;
  rows: any[];
  primaryKey?: string;

  // need to checking use or not use
  titleKey?: string;
  titleUrlKey?: string;
  photoKey?: string;
}