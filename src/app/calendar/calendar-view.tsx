"use client";

import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg, EventSourceFunc } from "@fullcalendar/core/index.js";

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  color?: string;
};

export default function CalendarView() {
  const router = useRouter();

  const fetchEvents: EventSourceFunc = async (fetchInfo, successCallback, failureCallback) => {
    try {
      const query = new URLSearchParams({
        start: fetchInfo.startStr,
        end: fetchInfo.endStr,
      });

      const response = await fetch(`/api/notes/calendar?${query.toString()}`);
      const payload = await response.json() as {
        success: boolean;
        data: CalendarEvent[] | null;
      };

      if (!response.ok || !payload.success || !payload.data) {
        failureCallback(new Error("Failed to load calendar notes"));
        return;
      }

      successCallback(payload.data);
    } catch (error) {
      failureCallback(error as Error);
    }
  };

  const handleEventClick = (eventClickInfo: EventClickArg) => {
    eventClickInfo.jsEvent.preventDefault();
    router.push(`/notes/${eventClickInfo.event.id}/edit`);
  };

  const handleDateClick = (dateClickInfo: DateClickArg) => {
    router.push(`/notes/create?start=${encodeURIComponent(dateClickInfo.dateStr)}`);
  };

  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={fetchEvents}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
      />
    </div>
  );
}
