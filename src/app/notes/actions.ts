"use server";
import { APP_ERRORS } from "@/constants/errors";
import { createNote, deleteNote, getNotes, updateNote } from "@/services/notes";
import {
  deleteNoteSchema,
  noteSchema,
  notesPaginationQuerySchema,
  updateNoteSchema,
  type NoteFormValues,
} from "@/schemas/note";
import { refresh } from "next/cache";
import { Result } from "@/models/result";

const createNoteAction = async (
  _prevState: Record<string, unknown> | null,
  values: NoteFormValues,
) => {
  const parsed = noteSchema.safeParse(values);

  if (!parsed.success) {
    return Result.failureResult({
      key: APP_ERRORS.INVALID_INPUT.key,
      message: parsed.error.issues[0]?.message ?? APP_ERRORS.INVALID_INPUT.message,
    }).toJSON();
  }

  const result = await createNote(parsed.data.title, parsed.data.content);

  if (result.success) {
    refresh();
  }

  return result.toJSON();
};

const deleteNoteAction = async (
  _prevState: Record<string, unknown> | null,
  formData: FormData,
) => {
  const id = formData.get("noteId") as string;

  const parsed = deleteNoteSchema.safeParse({ noteId: id });
  if (!parsed.success) {
    return Result.failureResult({
      key: APP_ERRORS.INVALID_INPUT.key,
      message: parsed.error.issues[0]?.message ?? APP_ERRORS.INVALID_INPUT.message,
    }).toJSON();
  }

  const result = await deleteNote(id);
  if (result.success) {
    refresh();
  }
  return result.toJSON();
};

const updateNoteAction = async (
  _prevState: Record<string, unknown> | null,
  values: NoteFormValues & { noteId: string },
) => {
  const parsed = updateNoteSchema.safeParse(values);

  if (!parsed.success) {
    return Result.failureResult({
      key: APP_ERRORS.INVALID_INPUT.key,
      message: parsed.error.issues[0]?.message ?? APP_ERRORS.INVALID_INPUT.message,
    }).toJSON();
  }

  const result = await updateNote(
    parsed.data.noteId,
    parsed.data.title,
    parsed.data.content,
  );
  if (result.success) {
    refresh();
  }
  return result.toJSON();
};

const getNotesAction = async (searchQuery: { page?: string; pageSize?: string }) => {
  const parsed = notesPaginationQuerySchema.safeParse({
    page: searchQuery.page,
    pageSize: searchQuery.pageSize,
  });

  if (!parsed.success) {
    return Result.failureResult({
      key: APP_ERRORS.INVALID_PAGINATION_QUERY.key,
      message:
        parsed.error.issues[0]?.message ?? APP_ERRORS.INVALID_PAGINATION_QUERY.message,
    }).toJSON();
  }

  const result = await getNotes(parsed.data.page, parsed.data.pageSize);
  return result.toJSON();
};

export { createNoteAction, deleteNoteAction, updateNoteAction, getNotesAction };
