"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TablePaginationProps } from "./types";

export default function TablePagination({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  setPageIndex,
}: TablePaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex flex-col gap-4 border-t bg-card px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div className="text-sm text-muted-foreground">
        Page{" "}
        <span className="font-semibold text-foreground">{pageIndex + 1}</span>{" "}
        of <span className="font-semibold text-foreground">{pageCount}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPageIndex(0)}
          disabled={!canPreviousPage}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        <div className="hidden items-center gap-2 md:flex">
          {pages.map((page) => (
            <Button
              key={page}
              size="icon"
              variant={page === pageIndex ? "default" : "outline"}
              onClick={() => setPageIndex(page)}
              className="h-9 w-9 rounded-xl"
            >
              {page + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={!canNextPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
