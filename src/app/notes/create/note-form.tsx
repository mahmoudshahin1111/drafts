"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { noteSchema, type NoteFormValues } from "@/schemas/note";
import { createNoteAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {state?.error && (
          <p className="text-sm text-destructive">{state.error.message}</p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner />}
          Create Note
        </Button>
      </form>
    </Form>
  );
}
