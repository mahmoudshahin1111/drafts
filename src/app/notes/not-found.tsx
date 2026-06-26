import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Notes not found</h2>
      <p className="text-muted-foreground">The notes you are looking for do not exist.</p>
      <Link href="/notes" className="underline">
        Back to notes
      </Link>
    </div>
  );
}
