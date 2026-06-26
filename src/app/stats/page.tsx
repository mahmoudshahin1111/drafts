import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotesCount } from "@/services/notes";
import { FileText } from "lucide-react";
import { pluralizeWord } from "@/lib/utils";
import { Metadata } from "next";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Stats",
  description: "View statistics about your notes in Drafts.",
  keywords: ["notes", "drafts", "writing", "ideas", "productivity"],
}

export default async function Page() {
  const result = await getNotesCount();

  const totalNotes = result.success && result.data ? result.data.totalCount : 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
      <PageHeader
        title="Stats"
        description="View quick insights and totals for your notes workspace."
      />
      <Card className="w-full max-w-xl border-border/60 bg-linear-to-br from-card to-muted/40 shadow-sm">
        <CardHeader>
          <CardDescription>Total notes</CardDescription>
          <CardTitle className="text-4xl font-bold tracking-tight">
            {totalNotes}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="size-5" />
          </div>
          <p>
            You currently have {totalNotes} {pluralizeWord(totalNotes, "note")} in
            your workspace.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}