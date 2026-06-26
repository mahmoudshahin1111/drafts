"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, type NoteFormValues } from "@/schemas/note";
import { createNoteAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import SharedNoteForm from "@/components/note-form";

export default function NoteForm() {
  const [state, dispatch, isPending] = useActionState(createNoteAction, null);
  const router = useRouter();

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", content: "" },
  });

  const onValidSubmit: SubmitHandler<NoteFormValues> = (values) => {
    startTransition(() => {
      dispatch(values);
    });
  };

  useEffect(() => {
    if (state?.success && !isPending) {
      form.reset();
      toast.success("Note created successfully");
      router.replace("/notes");
    }
  }, [state?.success, form, router, isPending]);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <Card className="w-full md:w-4xl mt-[15vh]">
        <CardContent>
          <SharedNoteForm
            form={form}
            isPending={isPending}
            onSubmit={onValidSubmit}
            submitLabel="Create Note"
            errorMessage={state?.error?.message}
          />
        </CardContent>
      </Card>
    </div>
  );
}
