import { Layers01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AddBoardDialog from "../general/AddBoardDialog";
import BoardListView from "../general/BoardListView";

export default function SideBar() {
  return (
    <aside className="flex w-[280px] min-w-[260px] flex-col border-r border-dashed py-6 px-4">
      <div className="mb-6 flex items-center justify-between w-full border-b border-dashed pb-2">
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={Layers01Icon}
            className="size-4 text-muted-foreground"
          />
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            board list
          </p>
        </div>
        <AddBoardDialog />
      </div>

      <BoardListView />
    </aside>
  );
}
