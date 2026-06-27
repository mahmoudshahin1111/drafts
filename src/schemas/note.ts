import { isMatch } from "date-fns";
import { z } from "zod";
import { SUPPORTED_NOTE_DATE_FORMAT } from "../constants/date";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from "../constants/page";

export const noteSchema = z
  .object({
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex value"),
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
  page: z.coerce.number().int().min(1).default(DEFAULT_PAGE),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
export type DeleteNoteValues = z.infer<typeof deleteNoteSchema>;
export type NotesPaginationQuery = z.infer<typeof notesPaginationQuerySchema>;
