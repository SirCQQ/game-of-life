"use client";

import { cn } from "@/lib/utils";

export const Cell = ({
  column,
  isAlive,
  row,
  setCell,
}: {
  isAlive: number;
  row: number;
  column: number;
  setCell: (row: number, column: number) => () => void;
}) => {
  return (
    <div
      className={cn("w-2 h-2 bg-black outline outline-1 outline-white", {
        "bg-white": isAlive,
      })}
      onClick={setCell(row, column)}
    />
  );
};
