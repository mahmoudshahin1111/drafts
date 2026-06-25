import { createNoteAction } from "../actions";
import NoteForm from "./note-form";

export default function Page() {
  return <NoteForm createNoteAction={createNoteAction} />;
}
