import { Metadata } from "next";
import NoteForm from "./note-form";

export const metadata:Metadata = {
  title: "Create Note",
  description: "Create a new note in Drafts.",
  keywords: ["notes", "drafts", "writing", "ideas", "productivity"],
};

export default function Page() {
  return <NoteForm />;
}
