import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-10">
      <Card className="relative z-10 w-full max-w-xl border-border/60 bg-card/95 shadow-lg backdrop-blur">
        <CardHeader className="gap-3">
          <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Spinner className="size-5" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Loading your workspace
          </CardTitle>
          <CardDescription className="text-base">
            Preparing your latest notes and stats...
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 pb-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
}
