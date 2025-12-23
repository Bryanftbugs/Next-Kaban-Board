"use client";
import { Layers01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import BoardItemView from "../kanban/BoardItemView";

//STORE
import { useLocalState } from "@/lib/stores";
import AddBoardDialog from "./AddBoardDialog";

import EmptyBoardList from "./EmptyBoardList";

export default function BoardListView() {
  const boardList = useLocalState((state) => state.Boards);

  return (
    <div className="flex flex-col mb-8 h-[450px]">
      <div className="mb-6 flex items-center justify-between w-full border-b border-dashed pb-2">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={Layers01Icon}
            className="size-4 text-muted-foreground"
          />
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            your boards
          </p>
        </div>
        <AddBoardDialog />
      </div>
      {boardList.length > 0 ? (
        <nav className="space-y-2 text-sm">
          {boardList.map((board) => (
            <BoardItemView
              id={board.id}
              key={board.id}
              label={board.label}
              total_columns={board.total_columns}
            />
          ))}
        </nav>
      ) : (
        <EmptyBoardList />
      )}
    </div>
  );
}
