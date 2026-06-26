import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotesTable from "./notes-table";
import { getNotesAction } from "./actions";
import { notFound } from "next/navigation";
import { Note } from "@/models/note";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, NotepadText } from "lucide-react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const query = await searchParams;
  const result = await getNotesAction({ page: query.page });

  if (!result.success) {
     return notFound();
  }
  const { items, page, totalPages } = result.data as {
    items: Note[];
    page: number;
    totalPages: number;
  };

  if (items?.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <NotepadText />
          </EmptyMedia>
          <EmptyTitle>No Notes Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any notes yet. Get started by creating your
            first note.
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
    );
  }
  return (
    <div>
      <Button asChild>
        <Link href="/notes/create">Create Note</Link>
      </Button>
      <NotesTable
        items={items}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
