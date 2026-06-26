import { Metadata } from "next";
import NoteForm from "./note-form";
import PageHeader from "@/components/page-header";

export const metadata:Metadata = {
  title: "Create Note",
  description: "Create a new note in Drafts.",
  keywords: ["notes", "drafts", "writing", "ideas", "productivity"],
};

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
      <PageHeader
        title="Create Note"
        description="Add a new note to capture your thoughts and ideas."
      />
      <NoteForm />
    </div>
  );
}
