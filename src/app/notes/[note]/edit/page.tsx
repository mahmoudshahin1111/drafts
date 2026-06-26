import { getNote } from "@/services/notes";
import { notFound } from "next/navigation";
import EditNoteForm from "./edit-note-form";
import { Note } from "@/models/note";
import { Metadata } from "next";
import PageHeader from "@/components/page-header";

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

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
      <PageHeader
        title="Edit Note"
        description="Update your note details and keep content up to date."
      />
      <EditNoteForm note={note as Note} />
    </div>
  );
}
