import { prisma } from "@/lib/prisma";
import { APP_ERRORS } from "@/constants/errors";
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
    return Result.failureResult(APP_ERRORS.NOTE_NOT_FOUND);
  }
  await prisma.note.delete({ where: { id: noteId } });
  return Result.successResult(null);
}

async function updateNote(noteId: string, title: string, content: string) {
  const existing = await prisma.note.findUnique({ where: { id: noteId } });
  if (!existing) {
    return Result.failureResult(APP_ERRORS.NOTE_NOT_FOUND);
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
    return Result.failureResult(APP_ERRORS.NOTE_NOT_FOUND);
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

async function getNotes(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const [totalCount, notes] = await prisma.$transaction([
    prisma.note.count(),
    prisma.note.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (page > totalPages) {
    return Result.failureResult(APP_ERRORS.PAGE_NOT_FOUND);
  }

  return Result.successResult({
    items: notes.map((e) =>
      new Note({
        id: e.id,
        title: e.title,
        content: e.content,
        updatedAt: e.updatedAt,
        createdAt: e.createdAt,
      }).toJSON(),
    ),
    page,
    pageSize,
    totalCount,
    totalPages,
  });
}

export { createNote, deleteNote, updateNote, getNote, getNotes };
