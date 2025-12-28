import { Folder02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function EmptyItem() {
  return (
    <div className="flex flex-col items-center text-gray-300 my-40">
      <HugeiconsIcon className="size-8" icon={Folder02Icon} />
      <p className="text-sm select-none font-medium">No items here.</p>
    </div>
  );
}
