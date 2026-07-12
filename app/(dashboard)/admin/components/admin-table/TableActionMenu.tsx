"use client";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { TableActionMenuProps } from "./types";

export default function TableActionMenu({ items }: TableActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[180px]">
        {items.map((item, index) => (
          <div key={index}>
            <DropdownMenuItem
              onClick={item.onClick}
              className={`cursor-pointer ${
                item.destructive ? "text-red-600 focus:text-red-600" : ""
              }`}
            >
              {item.icon && (
                <span className="mr-2 flex h-4 w-4 items-center justify-center">
                  {item.icon}
                </span>
              )}

              {item.label}
            </DropdownMenuItem>

            {index !== items.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
