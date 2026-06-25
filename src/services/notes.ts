import { prisma } from "@/lib/prisma";
import { Note } from "@/models/note";
import { Result } from "@/models/result";

async function createNote(title: string, content: string) {
  const note = await prisma.note.create({ data: { title, content } });
  return Result.successResult(
    new Note({
      id: note.id,
      title: note.title,
      content: note.content,
      updatedAt: note.updatedAt,
      createdAt: note.createdAt,
    }).toJSON(),
  );
}

async function deleteNote(noteId: string) {
  const existing = await prisma.note.findUnique({ where: { id: noteId } });
  if (!existing) {
    return Result.failureResult("Note not found");
  }
  await prisma.note.delete({ where: { id: noteId } });
  return Result.successResult(null);
}

async function updateNote(noteId: string, title: string, content: string) {
  const existing = await prisma.note.findUnique({ where: { id: noteId } });
  if (!existing) {
    return Result.failureResult("Note not found");
  }
  const note = await prisma.note.update({
    where: { id: noteId },
    data: { title, content },
  });
  return Result.successResult(
    new Note({
      id: note.id,
      title: note.title,
      content: note.content,
      updatedAt: note.updatedAt,
      createdAt: note.createdAt,
    }).toJSON(),
  );
}

async function getNote(noteId: string) {
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note) {
    return Result.failureResult("Note not found");
  }
  return Result.successResult(
    new Note({
      id: note.id,
      title: note.title,
      content: note.content,
      updatedAt: note.updatedAt,
      createdAt: note.createdAt,
    }).toJSON(),
  );
}

async function getNotes() {
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
  return Result.successResult(
    notes.map((e) =>
      new Note({
        id: e.id,
        title: e.title,
        content: e.content,
        updatedAt: e.updatedAt,
        createdAt: e.createdAt,
      }).toJSON(),
    ),
  );
}

export { createNote, deleteNote, updateNote, getNote, getNotes };
