import { getNote } from "@/services/notes";
import { notFound } from "next/navigation";
import EditNoteForm from "./edit-note-form";
import { Note } from "@/models/note";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Edit Note",
  description: "Edit an existing note in Drafts.",
  keywords: ["notes", "drafts", "writing", "ideas", "productivity"],
};

export default async function Page({
  params,
}: {
  params: Promise<{ note: string }>;
}) {
  const resolvedParams = await params;
  const result = await getNote(resolvedParams.note);

  if (!result.success) {
    notFound();
  }

  const note = result.data;


  return <EditNoteForm note={note as Note} />;
}
