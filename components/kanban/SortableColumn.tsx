//COMPONENTS
import ColumnOverlay from "./ColumnOverlay";

//TYPES
import { Column as ColumnType, Item } from "@/lib/types";
interface Props {
  column_details: ColumnType;
  items: Item[];
  activeItem?: Item | null;
  overId?: string | number | null;
}

//DND
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import SortableItem from "./SortableItem";

export default function SortableColumn({
  column_details,
  items,
  activeItem,
  overId,
}: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column_details.id,
    data: {
      type: "Column",
      column_details,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const filteredItems = useMemo(
    () => items.filter((item) => item.columnId === column_details.id),
    [items, column_details.id]
  );

  const itemsId = useMemo(
    () => filteredItems.map((item) => item.id),
    [filteredItems]
  );

  // Check if an item is being dragged over this column
  const isItemOverColumn =
    activeItem &&
    overId === column_details.id &&
    activeItem.columnId !== column_details.id;

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style}>
        <ColumnOverlay />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`min-w-[277px] px-2.5 py-4 rounded-2xl h-[650px] bg-gray-50 border ${
        isItemOverColumn ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab w-full text-gray-500 uppercase tracking-wide text-xs font-medium flex gap-2"
        >
          {column_details.label}
        </div>
      </div>

      {/* content children */}

      <div className="flex flex-col gap-2">
        <SortableContext items={itemsId}>
          {filteredItems?.map((item) => (
            <SortableItem key={item.id} item_details={item} />
          ))}
        </SortableContext>
      </div>

      {/* footer */}
    </div>
  );
}
