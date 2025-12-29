export type Id = string | number;

export type Board = {
  id: Id;
  label: string;
  description?: string;
  total_columns?: number;
  //   created_at: number;
  //   updated_at: number;
};

export type Column = {
  id: Id;
  boardId: Id;
  label: string;
};

export type Item = {
  id: Id;
  columnId: Id;
  content: string;
  tag?: string;
  tagColor?: Color;
};

//UI
// If a new color was added to this type, the Badge component needs to accept the added color too.
export type Color = "pink" | "purple" | "blue" | "amber" | "red";
