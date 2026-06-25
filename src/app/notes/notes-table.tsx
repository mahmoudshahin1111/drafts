"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Note } from "@/models/note";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { deleteNoteAction } from "./actions";

type NotesTableProps = {
  items: Note[];
  deleteNoteAction: typeof deleteNoteAction;
};

export default function NotesTable({ items, deleteNoteAction }: NotesTableProps) {
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
              <Link href={`/notes/${item.id}/edit`}>Update</Link>
              <DeleteButton deleteNoteAction={deleteNoteAction} noteId={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
