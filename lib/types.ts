export type Id = string | number;

export type Board = {
  id: Id;
  label: string;
  description?: string;
  total_columns?: number;
  is_active: boolean;
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
};
