"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuIcon, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { Separator } from "./ui/separator";

const links = [
  { href: "/notes", label: "Notes" },
  { href: "/stats", label: "Stats" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 lg:px-8">
        <Menubar className="lg:hidden inline-flex">
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                {links.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

                  return (
                    <MenubarItem
                      key={link.href}
                      onClick={() => {
                        router.push(link.href);
                      }}
                      className={cn(
                        "cursor-pointer px-3 py-1.5 text-sm transition-colors",
                        isActive && "bg-primary/10 font-medium text-primary",
                      )}
                    >
                      {link.label}
                    </MenubarItem>
                  );
                })}
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Separator orientation="vertical" className="lg:hidden block" />
        <Link href="/notes" className="inline-flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <NotebookPen className="size-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">
            Drafts
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <p className="ml-auto hidden text-sm text-muted-foreground lg:block">
          Capture, organize, and review your ideas.
        </p>
      </div>
    </header>
  );
}
