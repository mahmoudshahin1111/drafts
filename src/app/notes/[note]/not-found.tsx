import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Note not found</h2>
      <p className="text-muted-foreground">The note you are looking for does not exist.</p>
      <Link href="/notes" className="underline">
        Back to notes
      </Link>
    </div>
  );
}
