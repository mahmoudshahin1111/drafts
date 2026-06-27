"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Note } from "@/models/note";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleSlash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type NotesTableProps = {
  items: Note[];
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function NotesTable({
  items,
  page,
  pageSize,
  totalPages,
}: NotesTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildHref = (targetPage: number, targetPageSize = pageSize) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    params.set("pageSize", String(targetPageSize));
    return `${pathname}?${params.toString()}`;
  };

  const prevPageHref = buildHref(Math.max(1, page - 1));
  const nextPageHref = buildHref(Math.min(totalPages, page + 1));

  const handlePageSizeChange = (value: string) => {
    const nextSize = Number(value);
    router.push(buildHref(1, nextSize));
  };

  const getDisplayValue = (value: string | null | undefined) => {
    const normalized = value?.trim();
    return normalized && normalized.length > 0 ? normalized : null;
  };

  const renderEmpty = (label: string) => (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground italic">
      <CircleSlash2 className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="h-[60vh] rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-30">Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="w-30 ps-4 sticky right-0">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-30">
                  <div
                    className="max-w-[36ch] truncate"
                    title={getDisplayValue(item.title) ?? undefined}
                  >
                    {getDisplayValue(item.title)}
                  </div>
                </TableCell>
                <TableCell>
                  {getDisplayValue(item.content) ? (
                    <div
                      className="max-w-[36ch] truncate"
                      title={getDisplayValue(item.content) ?? undefined}
                    >
                      {getDisplayValue(item.content)}
                    </div>
                  ) : (
                    renderEmpty("No content")
                  )}
                </TableCell>
                <TableCell className="w-30 px-4">
                  <div className="flex flex-row gap-2">
                    <Button asChild variant="secondary">
                      <Link href={`/notes/${item.id}/edit`}>Update</Link>
                    </Button>
                    <DeleteButton noteId={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-end gap-2">
        <label className="text-sm text-muted-foreground" htmlFor="page-size">
          Rows per page
        </label>
        <Select
          onValueChange={(e) => handlePageSizeChange(e)}
          defaultValue="10"
          value={String(pageSize)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[10, 20, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  onClick={() => handlePageSizeChange(String(size))}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="text-muted-foreground text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          disabled={page === 1}
          asChild={page > 1}
        >
          {page > 1 ? (
            <Link href={prevPageHref}>Previous</Link>
          ) : (
            <span>Previous</span>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={page === totalPages}
          asChild={page < totalPages}
        >
          {page < totalPages ? (
            <Link href={nextPageHref}>Next</Link>
          ) : (
            <span>Next</span>
          )}
        </Button>
      </div>
    </div>
  );
}
