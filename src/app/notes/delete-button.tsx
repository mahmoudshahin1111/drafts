import { Button } from "@/components/ui/button";
import { deleteNoteAction } from "./actions";

export default function DeleteButton({ noteId }: { noteId: string }) {
  return (
    <form action={deleteNoteAction}>
      <input type="hidden" name="noteId" value={noteId} />
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
