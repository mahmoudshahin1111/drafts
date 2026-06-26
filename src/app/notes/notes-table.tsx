"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Note } from "@/models/note";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { Button } from "@/components/ui/button";

type NotesTableProps = {
  items: Note[];
  page: number;
  totalPages: number;
};

export default function NotesTable({ items, page, totalPages }: NotesTableProps) {
  const prevPageHref = `/notes?page=${Math.max(1, page - 1)}`;
  const nextPageHref = `/notes?page=${Math.min(totalPages, page + 1)}`;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell className="space-x-2">
                <Button asChild variant="secondary">
                  <Link href={`/notes/${item.id}/edit`}>Update</Link>
                </Button>
                <DeleteButton noteId={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-2">
        <span className="text-muted-foreground text-sm">
          Page {page} of {totalPages}
        </span>
        <Button type="button" variant="outline" disabled={page === 1} asChild={page > 1}>
          {page > 1 ? <Link href={prevPageHref}>Previous</Link> : <span>Previous</span>}
        </Button>
        <Button type="button" variant="outline" disabled={page === totalPages} asChild={page < totalPages}>
          {page < totalPages ? <Link href={nextPageHref}>Next</Link> : <span>Next</span>}
        </Button>
      </div>
    </div>
  );
}
