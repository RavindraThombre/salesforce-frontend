import {
  ColumnDef,
  PaginationState,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import { ReactNode } from "react";

export interface AdminDataTableProps<T extends object> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  selectable?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  toolbar?: ReactNode;
  onRefresh?: () => void;
  renderRowActions?: (row: T) => ReactNode;
}

export interface TableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  toolbar?: ReactNode;
  onRefresh?: () => void;
}

export interface TablePaginationProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPageIndex: (page: number) => void;
}

export interface TableLoadingProps {
  columns?: number;
  rows?: number;
}

export interface TableEmptyProps {
  message?: string;
}

export interface TableActionMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

export interface TableActionMenuProps {
  items: TableActionMenuItem[];
}

/**
 * Internal table state
 */
export interface TableState {
  sorting: SortingState;
  pagination: PaginationState;
  columnVisibility: VisibilityState;
  rowSelection: RowSelectionState;
  globalFilter: string;
}
