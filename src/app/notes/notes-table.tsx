"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Note } from "@/models/note";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { Button } from "@/components/ui/button";

type NotesTableProps = {
  items: Note[];
}

export default function NotesTable({ items }: NotesTableProps) {
  return (
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
            <TableCell>
              <Button asChild variant="secondary" >
                <Link href={`/notes/${item.id}/edit`}>Update</Link>
              </Button>
              <DeleteButton noteId={item.id}  />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
