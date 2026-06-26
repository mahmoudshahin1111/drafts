import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content must be at most 1000 characters"),
});

export const deleteNoteSchema = z.object({
  noteId: z.string().min(1, "Note id is required"),
});

export const updateNoteSchema = noteSchema.extend({
  noteId: z.string().min(1, "Note id is required"),
});

export const notesPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(5),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
export type DeleteNoteValues = z.infer<typeof deleteNoteSchema>;
export type NotesPaginationQuery = z.infer<typeof notesPaginationQuerySchema>;
