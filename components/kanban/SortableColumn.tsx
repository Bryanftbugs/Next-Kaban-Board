//COMPONENTS
import ColumnOverlay from "./ColumnOverlay";

//TYPES
import { Column as ColumnType, Item } from "@/lib/types";
interface Props {
  column_details: ColumnType;
  items: Item[];
}

//DND
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import SortableItem from "./SortableItem";

export default function SortableColumn({ column_details, items }: Props) {
  const [isItemDragged, setIsItemDragged] = useState<boolean>(false);

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
      className="w-[280px] min-w-[280px] px-2.5 py-4 rounded-2xl h-[650px] bg-gray-50 border border-gray-300"
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
