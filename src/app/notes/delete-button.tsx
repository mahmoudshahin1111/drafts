"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteNoteAction } from "./actions";

export default function DeleteButton({ noteId }: { noteId: string }) {
  const [, action, isPending] = useActionState(deleteNoteAction, null);

  return (
    <form action={action}>
      <input type="hidden" name="noteId" value={noteId} />
      <Button type="submit" variant="destructive" disabled={isPending}>
        {isPending && <Spinner />}
        Delete
      </Button>
    </form>
  );
}
