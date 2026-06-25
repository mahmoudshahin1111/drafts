"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createNoteAction as createNoteServerAction } from "../actions";

type NoteFormProps = {
  createNoteAction: typeof createNoteServerAction;
};

export default function NoteForm({ createNoteAction }: NoteFormProps) {
  return (
    <form action={createNoteAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" />
      </div>

      <Button type="submit">Create Note</Button>
    </form>
  );
}