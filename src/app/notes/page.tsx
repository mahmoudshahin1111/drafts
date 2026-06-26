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
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const query = await searchParams;
  const result = await getNotesAction({ page: query.page, pageSize: query.pageSize });

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
    <div className="flex flex-col gap-4 w-full items-center">
      <Card className="w-full md:w-4xl mt-[15vh]">
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
