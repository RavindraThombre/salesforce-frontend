"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import TableToolbar from "./TableToolbar";
import TableLoading from "./TableLoading";
import TableEmpty from "./TableEmpty";
import TablePagination from "./TablePagination";

import type { AdminDataTableProps } from "./types";

export default function AdminDataTable<TData extends object>({
  columns,
  data,

  loading = false,

  searchable = true,
  searchPlaceholder = "Search...",

  pageSize = 10,

  emptyMessage = "No records found.",

  toolbar,

  onRefresh,
}: AdminDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = React.useState("");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, unknown>[],

    state: {
      sorting,
      globalFilter,
      pagination,
      columnVisibility,
      rowSelection,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: setGlobalFilter,

    onPaginationChange: setPagination,

    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <TableLoading columns={columns.length} rows={pageSize} />;
  }

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-5">
      {searchable && (
        <TableToolbar
          search={globalFilter}
          onSearchChange={setGlobalFilter}
          searchPlaceholder={searchPlaceholder}
          toolbar={toolbar}
          onRefresh={onRefresh}
        />
      )}

      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="border-b bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        "h-14 whitespace-nowrap px-6 text-left text-sm font-semibold text-foreground",
                        header.column.getCanSort() &&
                          "cursor-pointer select-none",
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getCanSort() && (
                          <span className="text-xs text-muted-foreground">
                            {{
                              asc: "↑",
                              desc: "↓",
                            }[header.column.getIsSorted() as "asc" | "desc"] ??
                              "↕"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-0">
                    <TableEmpty message={emptyMessage} />
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm align-middle"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          setPageIndex={table.setPageIndex}
        />
      </div>
    </div>
  );
}
