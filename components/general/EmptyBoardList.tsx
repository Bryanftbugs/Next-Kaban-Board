import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function EmptyBoardList() {
  return (
    <div className="my-auto opacity-35 select-none">
      <div className="flex flex-col gap-2 items-center">
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          className="bg-secondary rounded size-6"
        />
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium">No Boards Yet</p>
          <p className="text-sm text-muted-foreground">
            Click the + button to add
          </p>
        </div>
      </div>
    </div>
  );
}
