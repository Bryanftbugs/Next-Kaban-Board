"use client";
import { useMemo, useState } from "react";
import NoSelectedBoard from "./NoSelectedBoard";

//COMPONENTS
import SortableColumn from "./SortableColumn";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import DropZoneActions from "./DropZoneActions";

//STORES
import { useLocalState } from "@/lib/stores";
import { Item, Column as ColumnType } from "@/lib/types";

// dnd-kit
import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  DragOverEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function DropZone() {
  const activeBoard = useLocalState((state) => state.ActiveBoard);
  const Columns = useLocalState((state) => state.Columns);
  const Items = useLocalState((state) => state.Items);
  const setColumns = useLocalState((states) => states.setColumns);
  const setItems = useLocalState((states) => states.setItems);
  const hasHydrated = useLocalState((state) => state.hasHydrated);

  const filteredColumnList = useMemo(
    () => Columns.filter((column) => column.boardId === activeBoard?.id),
    [Columns, activeBoard?.id]
  );

  const statusId = useMemo(
    () => filteredColumnList.map((status) => status.id),
    [filteredColumnList]
  );

  // ✅ local UI-only state
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [overId, setOverId] = useState<string | number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  if (!hasHydrated) {
    return <p>Loading...</p>;
  }

  if (!activeBoard) {
    return <NoSelectedBoard />;
  }

  const activeColumns = Columns.filter(
    (column) => column.boardId === activeBoard.id
  );

  return (
    <div className="w-full h-full py-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              {activeBoard.label}
            </h2>
          </div>
          <p className="text-gray-300 select-none">|</p>
          <div>
            <p className="text-sm text-muted-foreground">
              {activeBoard.description}
            </p>
          </div>
        </div>

        {/* Dropzone actions */}
        <DropZoneActions boardId={activeBoard.id} />
      </div>

      <div className="w-full">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <ScrollArea className="h-[690px]">
            <div className="flex items-center gap-4 justify-start h-full">
              <SortableContext items={statusId}>
                {filteredColumnList.map((item) => (
                  <SortableColumn
                    key={item.id}
                    column_details={item}
                    items={Items}
                    activeItem={activeItem}
                    overId={overId}
                  />
                ))}
              </SortableContext>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <DragOverlay>
            {activeColumn && (
              <SortableColumn column_details={activeColumn} items={Items} />
            )}
            {activeItem && <SortableItem item_details={activeItem} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  // ✅ DND handlers

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column_details);
      return;
    }

    if (event.active.data.current?.type === "Item") {
      setActiveItem(event.active.data.current.item_details);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { over } = event;
    if (!over) {
      setOverId(null);
      return;
    }
    setOverId(over.id);
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveItem(null);
    setOverId(null);

    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Handle column reordering
    if (activeType === "Column" && overType === "Column") {
      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      const activeIndex = Columns.findIndex((col) => col.id === activeId);
      const overIndex = Columns.findIndex((col) => col.id === overId);

      if (activeIndex === -1 || overIndex === -1) return;

      const newColumns = arrayMove(Columns, activeIndex, overIndex);
      if (newColumns === Columns) return;

      setColumns(newColumns);
      return;
    }

    // Handle item movement / reordering
    if (activeType === "Item") {
      const activeId = active.id;
      const overId = over.id;

      const itemsCopy = [...Items];
      const activeIndex = itemsCopy.findIndex((i) => i.id === activeId);
      if (activeIndex === -1) return;

      const activeItem = itemsCopy[activeIndex];

      // Dropped over another item: reorder and optionally move columns
      if (overType === "Item") {
        const overIndex = itemsCopy.findIndex((i) => i.id === overId);
        if (overIndex === -1) return;

        const overItem = itemsCopy[overIndex];

        // If same item and column, nothing to do
        if (
          activeItem.id === overItem.id &&
          activeItem.columnId === overItem.columnId
        ) {
          return;
        }

        const updatedItems = [...itemsCopy];
        updatedItems[activeIndex] = {
          ...activeItem,
          columnId: overItem.columnId,
        };

        setItems(arrayMove(updatedItems, activeIndex, overIndex));
        return;
      }

      // Dropped over a column: move item into that column
      if (overType === "Column") {
        const targetColumnId = overId;

        if (activeItem.columnId === targetColumnId) return;

        const updatedItems = [...itemsCopy];
        updatedItems[activeIndex] = {
          ...activeItem,
          columnId: targetColumnId,
        };

        setItems(updatedItems);
      }
    }
  }
}
