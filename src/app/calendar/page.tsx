import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import CalendarView from "./calendar-view";

export const metadata: Metadata = {
  title: "Calendar",
  description: "View your notes on a calendar timeline.",
  keywords: ["calendar", "notes", "drafts", "productivity"],
};

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8">
      <PageHeader
        title="Calendar"
        description="Explore your notes by date to quickly spot timelines and busy writing days."
      />
      <CalendarView />
    </div>
  );
}
