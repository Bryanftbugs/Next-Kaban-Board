import { Board, Column, Item } from "./types";

export const premadeBoards: Board[] = [
  {
    id: "board-1",
    label: "Todo List",
    description: "Personal tasks to get things done",
    total_columns: 3,
  },
  {
    id: "board-2",
    label: "Project Sprint",
    description: "Sprint tasks for a development project",
    total_columns: 4,
  },
];

export const premadeColumns: Column[] = [
  // Todo List board
  { id: "col-1", boardId: "board-1", label: "To Do" },
  { id: "col-2", boardId: "board-1", label: "In Progress" },
  { id: "col-3", boardId: "board-1", label: "Done" },

  // Project Sprint board
  { id: "col-4", boardId: "board-2", label: "Backlog" },
  { id: "col-5", boardId: "board-2", label: "In Development" },
  { id: "col-6", boardId: "board-2", label: "Code Review" },
  { id: "col-7", boardId: "board-2", label: "Completed" },
];

export const premadeItems: Item[] = [
  // Todo List items
  {
    id: "item-1",
    columnId: "col-1",
    content: "Buy groceries",
  },
  {
    id: "item-2",
    columnId: "col-1",
    content: "Clean the workspace",
  },
  {
    id: "item-3",
    columnId: "col-2",
    content: "Finish weekly report",
  },
  {
    id: "item-4",
    columnId: "col-3",
    content: "Reply to emails",
  },

  // Project Sprint items
  {
    id: "item-5",
    columnId: "col-4",
    content: "Design database schema",
  },
  {
    id: "item-6",
    columnId: "col-5",
    content: "Implement authentication flow",
  },
  {
    id: "item-7",
    columnId: "col-6",
    content: "Review pull request #42",
  },
  {
    id: "item-8",
    columnId: "col-7",
    content: "Setup project repository",
  },
];
