"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteNoteAction } from "./actions";
import { toast } from "sonner";

export default function DeleteButton({ noteId }: { noteId: string }) {
  const [state, action, isPending] = useActionState(deleteNoteAction, null);

  useEffect(() => {
    if (state?.success && !isPending) {
      toast.success("Note deleted successfully");
    }
  }, [state?.success, isPending]);

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
