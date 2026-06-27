import Link from "next/link";
import { format } from "date-fns";
import type { Note } from "@/generated/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type NotesCardsProps = {
  items: Note[];
};

export default function NotesCards({ items }: NotesCardsProps) {
  return (
    <ScrollArea className="h-[60vh] rounded-lg border p-1">
      <div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((note) => (
          <Link key={note.id} href={`/notes/${note.id}/edit`} className="group block">
            <Card
              className="h-full border-l-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:shadow-md"
              style={{
                borderLeftColor: note.color,
                backgroundColor: `${note.color}14`,
              }}
            >
              <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">
                  {note.title.trim() || "Untitled note"}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {format(note.noteDate, "PPP p")}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {note.content.trim() || "No content"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
