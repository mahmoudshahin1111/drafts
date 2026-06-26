"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, type NoteFormValues } from "@/schemas/note";
import { updateNoteAction } from "../../actions";
import { toast } from "sonner";
import SharedNoteForm from "@/components/note-form";
import { Card, CardContent } from "@/components/ui/card";

type EditNote = {
  id: string;
  title: string;
  content: string;
};

type EditNoteFormProps = {
  note: EditNote;
};

export default function EditNoteForm({ note }: EditNoteFormProps) {
  const [state, dispatch, isPending] = useActionState(updateNoteAction, null);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: note.title, content: note.content },
  });

  const onValidSubmit: SubmitHandler<NoteFormValues> = (values) => {
    startTransition(() => {
      dispatch({ ...values, noteId: note.id });
    });
  };

  useEffect(() => {
    if (state?.success && !isPending) {
      toast.success("Note updated successfully");
    }
  }, [state?.success, form, isPending]);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <Card className="w-full xl:w-4xl mt-[15vh]">
        <CardContent>
          <SharedNoteForm
          form={form}
          isPending={isPending}
          onSubmit={onValidSubmit}
          submitLabel="Update Note"
          cancelHref="/notes"
          errorMessage={state?.error?.message}
        />
        </CardContent>
      </Card>
    </div>
  );
}
