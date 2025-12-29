"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaintBoardIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

//PROPS
interface Props {
  color: string;
  setColor: (color: string) => void;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  pink: { bg: "bg-pink-500", text: "text-pink-600" },
  blue: { bg: "bg-blue-500", text: "text-blue-600" },
  amber: { bg: "bg-amber-500", text: "text-amber-600" },
  purple: { bg: "bg-purple-500", text: "text-purple-600" },
  red: { bg: "bg-red-500", text: "text-red-600" },
};

export function ItemColorSelection({ color, setColor }: Props) {
  const selectedColor = colorMap[color] || colorMap.pink;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <HugeiconsIcon icon={PaintBoardIcon} />
          <span
            className={cn(
              "absolute bottom-1 right-1 h-2 w-2 rounded-full border border-background",
              selectedColor.bg
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tag colors</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
          <DropdownMenuRadioItem
            value="pink"
            className="flex items-center gap-2"
          >
            <span className={cn("h-3 w-3 rounded-full", colorMap.pink.bg)} />
            Pink
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="blue"
            className="flex items-center gap-2"
          >
            <span className={cn("h-3 w-3 rounded-full", colorMap.blue.bg)} />
            Blue
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="amber"
            className="flex items-center gap-2"
          >
            <span className={cn("h-3 w-3 rounded-full", colorMap.amber.bg)} />
            Amber
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="purple"
            className="flex items-center gap-2"
          >
            <span className={cn("h-3 w-3 rounded-full", colorMap.purple.bg)} />
            Purple
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="red"
            className="flex items-center gap-2"
          >
            <span className={cn("h-3 w-3 rounded-full", colorMap.red.bg)} />
            Red
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
