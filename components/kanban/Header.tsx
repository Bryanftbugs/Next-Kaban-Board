import { HugeiconsIcon } from "@hugeicons/react";
import {
  CursorRectangleSelection02Icon,
  MoonEclipseIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

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
        <div className="flex items-center gap-2 text-gray-500">
          <HugeiconsIcon icon={MoonEclipseIcon} />
          <HugeiconsIcon icon={Settings02Icon} />
        </div>
      </div>
    </header>
  );
}
