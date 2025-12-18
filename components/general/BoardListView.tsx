"use client";

import { Board } from "@/lib/types";
import BoardItemView from "../kanban/BoardItemView";

export default function BoardListView() {
  const boards: Board[] = [
    {
      id: 1,
      label: "Job Application Tracker",
      total_columns: 12,
      is_active: true,
    },
    {
      id: 2,
      label: "Todo List",
      total_columns: 5,
      is_active: false,
    },
    {
      id: 3,
      label: "Blocked",
      total_columns: 11,
      is_active: false,
    },
  ];
  return (
    <nav className="space-y-2 text-sm">
      {boards.map((board) => (
        <BoardItemView
          id={board.id}
          key={board.id}
          label={board.label}
          total_columns={board.total_columns}
          is_active={board.is_active}
        />
      ))}
    </nav>
  );
}
