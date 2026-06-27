"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import type { Note } from "@/generated/prisma/client";
import type { PagedResult } from "@/models/result";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

type NotesCardsProps = {
  initialItems: Note[];
  initialPage: number;
  pageSize: number;
  totalPages: number;
};

type CardItem = Omit<Note, "noteDate"> & {
  noteDate: Date | string;
};

type NotesApiResponse = {
  success: boolean;
  data: PagedResult<CardItem> | null;
};

export default function NotesCards({
  initialItems,
  initialPage,
  pageSize,
  totalPages,
}: NotesCardsProps) {
  const [items, setItems] = useState<CardItem[]>(initialItems);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = useMemo(() => page < totalPages, [page, totalPages]);

  const loadNextPage = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(
        `/api/notes?page=${nextPage}&pageSize=${pageSize}`,
      );

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as NotesApiResponse;

      if (!payload.success || !payload.data) {
        return;
      }

      setItems((prevItems) => {
        const existingIds = new Set(prevItems.map((item) => item.id));
        const nextItems = payload.data?.items ?? [];
        const uniqueItems = nextItems.filter((item) => !existingIds.has(item.id));

        return [...prevItems, ...uniqueItems];
      });
      setPage(payload.data.page);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page, pageSize]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (isLoading || !hasMore) {
        return;
      }

      const target = event.currentTarget;
      const threshold = 160;
      const distanceToBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight;

      if (distanceToBottom <= threshold) {
        void loadNextPage();
      }
    },
    [hasMore, isLoading, loadNextPage],
  );

  return (
    <div className="h-[60vh] overflow-y-auto rounded-lg border p-1" onScroll={handleScroll}>
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
                  {format(new Date(note.noteDate), "PPP p")}
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
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <Spinner className="size-5" />
        </div>
      )}
    </div>
  );
}
