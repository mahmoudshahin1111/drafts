import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">

      <PageHeader
        title="About"
        description="Learn more about Drafts and what it is built for."
      />

      <Card className="w-full border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2">
        <CardHeader>
          <CardTitle>About Drafts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground lg:text-base">
          <p>
            Drafts is a simple notes app focused on capturing ideas quickly and
            organizing them in a clean, distraction-free interface.
          </p>
          <p>
            It includes multiple note views (table and cards), calendar-based
            browsing, and a responsive layout that works well across devices.
          </p>
          <p>
            Built with Next.js, TypeScript, Prisma, and PostgreSQL.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs text-foreground/80">
              Next.js 16
            </span>
            <span className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs text-foreground/80">
              Prisma
            </span>
            <span className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs text-foreground/80">
              PostgreSQL
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-0 slide-in-from-bottom-2">
        <CardHeader>
          <CardTitle>Developer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground lg:text-base">
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">Profile</h3>
            <p>
              Drafts is developed and maintained by <strong className="text-foreground">Mahmoud Shahin</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">Focus</h3>
            <p>
              Building practical, user-friendly tools with modern web
              technologies and clean developer experience.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">Links</h3>
            <ul className="space-y-1">
              <li>
                GitHub: {" "}
                <Link
                  href="https://github.com/mahmoudshahin1111"
                  className="text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/mahmoudshahin1111
                </Link>
              </li>
              <li>
                Repository: {" "}
                <Link
                  href="https://github.com/mahmoudshahin1111/drafts"
                  className="text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/mahmoudshahin1111/drafts
                </Link>
              </li>
              <li>
                LinkedIn: {" "}
                <Link
                  href="https://www.linkedin.com/in/mahmoud-shahin-044b99182/"
                  className="text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/mahmoud-shahin-044b99182
                </Link>
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
