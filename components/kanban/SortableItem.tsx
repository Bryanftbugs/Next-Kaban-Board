"use client";

//components
import ItemOverlay from "./ItemOverlay";
import ColoredBadge from "../general/ColoredBadge";

//dnd
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//types
import { Item as ItemType } from "@/lib/types";
import { DragDropHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  item_details: ItemType;
  onItemClick?: (item: ItemType) => void;
}

export default function SortableItem({ item_details, onItemClick }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item_details.id,
    data: {
      type: "Item",
      item_details,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style}>
        <ItemOverlay />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-xl bg-white shadow-md flex flex-col min-h-28 cursor-pointer border hover:border-primary transition-shadow"
      onClick={() => onItemClick?.(item_details)}
    >
      {/* Header (draggable) */}
      <div className="flex items-center justify-between mb-2">
        <ColoredBadge
          color={item_details.tagColor!}
          label={item_details.tag!}
        />
        <div
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover:cursor-grab"
          onClick={(e) => e.stopPropagation()}
        >
          <HugeiconsIcon icon={DragDropHorizontalIcon} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-sm">{item_details.content}</p>
        <p className="text-xs text-muted-foreground">This is the content.</p>
      </div>
    </div>
  );
}
