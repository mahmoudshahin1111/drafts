"use client";

import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import Link from "next/link";
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
  cancelHref?: string;
  cancelLabel?: string;
  errorMessage?: string;
  className?: string;
};

export default function SharedNoteForm({
  form,
  isPending,
  onSubmit,
  submitLabel,
  cancelHref,
  cancelLabel = "Cancel",
  errorMessage,
  className,
}: SharedNoteFormProps) {
  const formErrors = form.formState.errors as Record<
    string,
    { message?: string } | undefined
  >;
  const globalValidationError = formErrors.global?.message;
  const globalErrorMessage = globalValidationError ?? errorMessage;

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

        {globalErrorMessage && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {globalErrorMessage}
          </p>
        )}

        <div className="flex items-center justify-end gap-2">
          {cancelHref ? (
            <Button asChild type="button" variant="outline" size="lg" disabled={isPending}>
              <Link href={cancelHref}>{cancelLabel}</Link>
            </Button>
          ) : null}

          <Button type="submit" disabled={isPending} size="lg">
            {isPending && <Spinner />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
