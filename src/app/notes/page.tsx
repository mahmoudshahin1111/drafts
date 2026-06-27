import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotesTable from "./notes-table";
import { notFound } from "next/navigation";
import type { Note } from "@/generated/prisma/client";
import { notesPaginationQuerySchema } from "@/schemas/note";
import { getNotes } from "@/services/notes";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, NotepadText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/page-header";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const query = await searchParams;
  const parsedQuery = notesPaginationQuerySchema.safeParse({
    page: query.page,
    pageSize: query.pageSize ?? "10",
  });

  if (!parsedQuery.success) {
    return notFound();
  }

  const result = await getNotes(parsedQuery.data.page, parsedQuery.data.pageSize);

  if (!result.success) {
    return notFound();
  }
  const { items, page, pageSize, totalPages } = result.data as {
    items: Note[];
    page: number;
    pageSize: number;
    totalPages: number;
  };

  if (items?.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
        <PageHeader
          title="Notes"
          description="Browse, manage, and organize all your notes in one place."
        />
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <NotepadText />
            </EmptyMedia>
            <EmptyTitle>No Notes Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any notes yet. Get started by creating
              your first note.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button asChild variant="secondary">
              <Link href="/notes/create">
                Create Note <ArrowUpRightIcon />
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
      <PageHeader
        title="Notes"
        description="Browse, manage, and organize all your notes in one place."
      />
      <Card className="w-full">
        <CardHeader className="flex justify-end">
          <span className="flex-1 text-lg font-semibold">Notes</span>
          <Button asChild>
            <Link href="/notes/create">Create Note</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <NotesTable
            items={items}
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>
    </div>
  );
}
