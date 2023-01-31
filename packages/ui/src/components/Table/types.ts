import type {
  Column,
  ColumnDef,
  Table as ReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export type { ColumnDef as TableColumnDefinition } from "@tanstack/react-table";

export type TSortDirection = "ASC" | "DESC" | "";

type TSingleFilter = {
  key: string;
  operator: string;
  value: string;
};

type TMultiFilter = {
  AND: TSingleFilter[];
};

type TFilterRequest = TSingleFilter | TMultiFilter | null;

type TSingleSort = {
  key: string;
  direction: TSortDirection;
};

type TSortRequest = TSingleSort[] | null;

export type TRequestJSON = {
  filter: TFilterRequest;
  sort: TSortRequest;
};

export type TFetchDataOptions = {
  currentPage?: string;
  filters?: string;
  size?: string;
  sorts?: string;
};

export interface TableProviderProperties<T> {
  children?: ReactNode;
  columns: ColumnDef<T>[];
  fetcher: (
    requestJSON: TRequestJSON
  ) => Promise<{ data: T[]; totalItems: number }>;
  enableMultiSort?: boolean;
  filterDebounceTime?: number;
  fixedHeader?: boolean;
  filterIcons?: {
    expanded: ReactNode;
    notExpanded: ReactNode;
  };
  hideScrollBar?: boolean;
  paginated?: boolean;
  paginationIcons?: {
    start: ReactNode;
    previous: ReactNode;
    next: ReactNode;
    end: ReactNode;
  };
  rowsPerPageOptions?: number[];
  showLoading?: boolean;
  showPageControl?: boolean;
  showTotalNumber?: boolean;
  sortable?: boolean;
  sortIcons?: {
    asc: ReactNode;
    desc: ReactNode;
    default: ReactNode;
  };
  title?: string;
}

export interface TableContextProperties<T>
  extends Pick<
    TableProviderProperties<T>,
    Exclude<keyof TableProviderProperties<T>, "fetcher">
  > {
  data: T[];
  fetchCallback: (requestJSON: TRequestJSON) => void;
  loading: boolean;
  totalItems: number;
}

export interface FilterProperties<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<T, any>;
  table: ReactTable<T>;
}

export interface PaginationProperties {
  config: {
    icon?: ReactNode;
    isDisabled: boolean;
    onClick: () => void;
  }[];
}

export interface TableBodyProperties<T> {
  rowModel: ReactTable<T>["getRowModel"];
}

export interface TableHeaderProperties<T> {
  table: ReactTable<T>;
}