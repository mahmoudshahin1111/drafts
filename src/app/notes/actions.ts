"use server";
import { createNote, deleteNote, updateNote } from "@/services/notes";
import { refresh } from "next/cache";
import { forbidden, redirect } from "next/navigation";

const createNoteAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const result = createNote(title, content);

  if (result.success) {
    redirect(`/notes/${result.data.id}/edit`);
  } else {
    forbidden();
  }
};

const deleteNoteAction = async (noteId: string) => {
  const result = deleteNote(noteId);
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
  const result = updateNote(noteId, title, content);
  if (result.success) {
    refresh();
  } else {
    forbidden();
  }
};

export { createNoteAction, deleteNoteAction, updateNoteAction };
