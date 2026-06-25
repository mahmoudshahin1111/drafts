import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotesTable from "./notes-table";
import { deleteNoteAction } from "./actions";
import { getNotes } from "@/services/notes";
import { forbidden } from "next/navigation";

export default async function Page() {
  const result = await getNotes();

  if (!result.success) {
    return forbidden();
  }
  const items = result.data;

  return (
    <div>
      <Button asChild>
        <Link href="/notes/new">New Note</Link>
      </Button>
      <NotesTable items={items} deleteNoteAction={deleteNoteAction} />
    </div>
  );
}
