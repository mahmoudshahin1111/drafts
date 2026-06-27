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
import { format, isValid } from "date-fns";
import { SUPPORTED_NOTE_DATE_FORMAT } from "../../../../constants/date";
import type { Note } from "@/generated/prisma/client";

type EditNoteFormProps = {
  note: Note;
};

export default function EditNoteForm({ note }: EditNoteFormProps) {
  const [state, dispatch, isPending] = useActionState(updateNoteAction, null);

  const defaultNoteDate = note.noteDate && isValid(note.noteDate)
    ? format(note.noteDate, SUPPORTED_NOTE_DATE_FORMAT)
    : "";

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
      noteDate: defaultNoteDate,
    },
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
