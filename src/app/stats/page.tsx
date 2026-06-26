import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotesCount } from "@/services/notes";
import { FileText } from "lucide-react";

export default async function Page() {
  const result = await getNotesCount();

  const totalNotes = result.success && result.data ? result.data.totalCount : 0;

  return (
    <div className="flex w-full justify-center px-4 py-8 md:px-8 md:py-12">
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
            You currently have {totalNotes} note{totalNotes === 1 ? "" : "s"} in
            your workspace.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}