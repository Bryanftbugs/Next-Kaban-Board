"use client";

//types
import { Board } from "@/lib/types";

export default function BoardItemView({
  label,
  total_columns,
  is_active,
}: Board) {
  return (
    <button
      className={`${
        is_active
          ? "activeboard"
          : "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-muted"
      }`}
    >
      <span>{label}</span>
      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
        {total_columns}
      </span>
    </button>
  );
}
