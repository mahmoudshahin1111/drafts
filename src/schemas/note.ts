import { isMatch } from "date-fns";
import { z } from "zod";
import { SUPPORTED_NOTE_DATE_FORMAT } from "../constants/date";

export const noteSchema = z
  .object({
    title: z
      .string()
      .max(100, "Title must be at most 100 characters"),
    content: z
      .string()
      .max(1000, "Content must be at most 1000 characters"),
    noteDate: z
      .string()
      .min(1, "Note date is required")
      .refine(
        (value) => isMatch(value, SUPPORTED_NOTE_DATE_FORMAT),
        "Note date must be a valid datetime",
      ),
  })
  .refine((data) => data.title?.trim() !== "" || data.content?.trim() !== "", {
    path: ["global"],
    message: "Either title or content is required",
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
