import * as z from "zod";

export const addNewBoardSchema = z.object({
  name: z
    .string()
    .min(5, "Board name must be at least 5 characters.")
    .max(25, "Bug title must be at most 25 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(30, "Description must be at most 30 characters."),
});

export const addNewColumnSchema = z.object({
  label: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(20, "Name must be at most 20 characters."),
});

export const addNewItemSchema = z.object({
  content: z
    .string()
    .min(5, "Content must be at least 5 characters.")
    .max(30, "Content must be at most 30 characters."),
  tag: z
    .string()
    .min(3, "Tag must be at least 3 characters.")
    .max(15, "Content must be at most 15 characters."),
});
