"use server";
import { createNote, deleteNote, updateNote } from "@/services/notes";
import { refresh } from "next/cache";
import { forbidden, redirect } from "next/navigation";

const createNoteAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const result = await createNote(title, content);

  if (result.success) {
    redirect(`/notes/${result.data?.id}/edit`);
  } else {
    forbidden();
  }
};

const deleteNoteAction = async (noteId: FormData) => {
  const id = noteId.get("noteId") as string;
  const result = await deleteNote(id);
  if (result.success) {
    refresh();
  } else {
    forbidden();
  }
};

const updateNoteAction = async (formData: FormData) => {
  const noteId = formData.get("noteId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const result = await updateNote(noteId, title, content);
  if (result.success) {
    refresh();
  } else {
    forbidden();
  }
};

export { createNoteAction, deleteNoteAction, updateNoteAction };
