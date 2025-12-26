// _lib/stores.ts

//premade boards
import { premadeBoards, premadeColumns, premadeItems } from "./premadeboard";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Column, Item, Board, Id } from "./types";

interface States {
  hasHydrated: boolean;
  ActiveBoard: Board | null;
  Boards: Board[];
  Columns: Column[];
  Items: Item[];
}

interface Actions {
  SetHasHydrated: (state: boolean) => void;
  SetActiveBoard: (boardId: Id) => void;
  DeleteColumn: (columnId: Id) => void;
  DeleteItem: (itemId: Id) => void;
  AddNewBoard: (newBoard: Board) => void;
  AddNewColumn: (newColumn: Column) => void;
  AddNewItem: (newItem: Item) => void;
  setColumns: (columns: Column[]) => void;
  setItems: (items: Item[]) => void;
}

export const useLocalState = create<States & Actions>()(
  persist(
    (set) => ({
      hasHydrated: false,
      ActiveBoard: null,
      Boards: premadeBoards,
      Columns: premadeColumns,
      Items: premadeItems,

      DeleteItem: (itemId) =>
        set((state) => ({
          Items: state.Items.filter((item) => item.id !== itemId),
        })),

      DeleteColumn: (columnId) =>
        set((state) => ({
          Columns: state.Columns.filter((column) => column.id !== columnId),
          Items: state.Items.filter((item) => item.columnId !== columnId),
        })),

      SetHasHydrated: (state: boolean) =>
        set({
          hasHydrated: state,
        }),

      SetActiveBoard: (boardId) =>
        set((state) => ({
          ActiveBoard:
            state.Boards.find((Board) => Board.id === boardId) || null,
        })),

      AddNewBoard: (newBoard) =>
        set((state) => ({
          Boards: [...state.Boards, newBoard],
        })),

      AddNewColumn: (newColumn) =>
        set((state) => ({
          Columns: [...state.Columns, newColumn],
        })),

      AddNewItem: (newItem) =>
        set((state) => ({
          Items: [...state.Items, newItem],
        })),

      setColumns: (columns) =>
        set(() => ({
          Columns: columns,
        })),

      setItems: (items) =>
        set(() => ({
          Items: items,
        })),
    }),
    {
      name: "board",
      onRehydrateStorage: (state) => {
        return () => state.SetHasHydrated(true);
      },
    }
  )
);
