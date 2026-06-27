import { prisma } from "@/lib/prisma";
import { APP_ERRORS } from "@/constants/errors";
import { Result } from "@/models/result";

async function createNote(title: string, content: string, noteDate: string) {
  const note = await prisma.note.create({
    select: {
      id: true,
      title: true,
      content: true,
      noteDate: true,
      createdAt: true,
      updatedAt: true,
    },
    data: { title, content, noteDate: new Date(noteDate) },
  });
  return Result.successResult(note);
}

async function deleteNote(noteId: string) {
  const existing = await prisma.note.findUnique({ where: { id: noteId } });
  if (!existing) {
    return Result.failureResult(APP_ERRORS.NOTE_NOT_FOUND);
  }
  await prisma.note.delete({ where: { id: noteId } });
  return Result.successResult(null);
}

async function updateNote(
  noteId: string,
  title: string,
  content: string,
  noteDate: string,
) {
  const existing = await prisma.note.findUnique({ where: { id: noteId } });
  if (!existing) {
    return Result.failureResult(APP_ERRORS.NOTE_NOT_FOUND);
  }
  const note = await prisma.note.update({
    select: {
      id: true,
      title: true,
      content: true,
      noteDate: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id: noteId },
    data: { title, content, noteDate: new Date(noteDate) },
  });
  return Result.successResult(note);
}

async function getNote(noteId: string) {
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    select: {
      id: true,
      title: true,
      content: true,
      noteDate: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!note) {
    return Result.failureResult(APP_ERRORS.NOTE_NOT_FOUND);
  }
  return Result.successResult(note);
}

async function getNotes(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const [totalCount, notes] = await prisma.$transaction([
    prisma.note.count(),
    prisma.note.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        noteDate: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (page > totalPages) {
    return Result.failureResult(APP_ERRORS.PAGE_NOT_FOUND);
  }

  return Result.successResult({
    items: notes,
    page,
    pageSize,
    totalCount,
    totalPages,
  });
}

async function getNotesCount() {
  const totalCount = await prisma.note.count();

  return Result.successResult({ totalCount });
}

export { createNote, deleteNote, updateNote, getNote, getNotes, getNotesCount };
