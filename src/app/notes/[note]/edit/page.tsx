import { getNote } from "@/services/notes";
import { notFound } from "next/navigation";
import { updateNoteAction } from "../../actions";
import EditNoteForm from "./edit-note-form";

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

  return <EditNoteForm note={note} updateNoteAction={updateNoteAction} />;
}
