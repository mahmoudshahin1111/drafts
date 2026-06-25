"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditNote = {
  id: string;
  title: string;
  content: string;
};

type EditNoteFormProps = {
  note: EditNote;
  updateNoteAction: (formData: FormData) => Promise<void>;
};

export default function EditNoteForm({ note, updateNoteAction }: EditNoteFormProps) {
  return (
    <form action={updateNoteAction} className="space-y-4">
      <Input type="hidden" name="noteId" value={note.id} />
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" defaultValue={note.title} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" defaultValue={note.content} />
      </div>
      <Button type="submit">Update Note</Button>
    </form>
  );
}
