//components
import ItemOverlay from "./ItemOverlay";

//dnd
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

//types
import { Item as ItemType } from "@/lib/types";
interface Props {
  item_details: ItemType;
}

export default function SortableItem({ item_details }: Props) {
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
      {...attributes}
      {...listeners}
      className="p-2 rounded-xl bg-white shadow-md flex flex-col min-h-24"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-sm">{item_details.content}</p>
      </div>
      <p className="text-xs text-muted-foreground">This is the content.</p>
    </div>
  );
}
