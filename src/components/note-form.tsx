"use client";

import type { SubmitHandler, UseFormReturn } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import type { NoteFormValues } from "@/schemas/note";

type SharedNoteFormProps = {
  form: UseFormReturn<NoteFormValues>;
  isPending: boolean;
  onSubmit: SubmitHandler<NoteFormValues>;
  submitLabel: string;
  errorMessage?: string;
  className?: string;
};

export default function SharedNoteForm({
  form,
  isPending,
  onSubmit,
  submitLabel,
  errorMessage,
  className,
}: SharedNoteFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
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
                <Textarea {...field} disabled={isPending} rows={15} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

        <Button type="submit" disabled={isPending} size="lg">
          {isPending && <Spinner />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
