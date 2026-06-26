import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <Card className="w-full xl:w-4xl mt-[15vh]">
        <CardHeader>
          <CardTitle className="text-2xl">Note not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The note you are looking for does not exist.
          </p>
         
        </CardContent>
        <CardFooter className="flex justify-end">
           <Button asChild variant="outline">
            <Link href="/notes">Back to notes</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
