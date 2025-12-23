import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddSquareIcon,
  CursorRectangleSelection02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b border-dashed h-16 flex items-center">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={CursorRectangleSelection02Icon}
            className="text-primary"
          />
          <h1 className="text-lg font-semibold">Kanban Board</h1>
        </div>
        <div>
          <Button>
            <HugeiconsIcon icon={AddSquareIcon} />
            New Board
          </Button>
        </div>
      </div>
    </header>
  );
}
