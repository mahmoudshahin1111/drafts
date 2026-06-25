"use client";

import { deleteNoteAction } from "../actions";
import { Button } from "@/components/ui/button";

export default function DeleteButton({
  deleteNoteAction,
  noteId,
}: {
  deleteNoteAction: typeof deleteNoteAction;
  noteId: string;
}) {
  return <Button onClick={() => deleteNoteAction(noteId)}>Delete</Button>;
}
