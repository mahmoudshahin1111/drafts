import { NextResponse } from "next/server";
import { APP_ERRORS } from "@/constants/errors";
import { Result } from "@/models/result";
import { getCalendarNotes } from "@/services/notes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      Result.failureResult({
        key: APP_ERRORS.INVALID_INPUT.key,
        message: "start and end are required",
      }).toJSON(),
      { status: 400 },
    );
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return NextResponse.json(
      Result.failureResult({
        key: APP_ERRORS.INVALID_INPUT.key,
        message: "invalid date range",
      }).toJSON(),
      { status: 400 },
    );
  }

  const result = await getCalendarNotes(startDate, endDate);

  if (!result.success || !result.data) {
    return NextResponse.json(
      Result.failureResult({
        key: result.error?.key ?? APP_ERRORS.INVALID_INPUT.key,
        message: result.error?.message ?? "failed",
      }).toJSON(),
      { status: 500 },
    );
  }

  const events = result.data.map((note) => ({
    id: note.id,
    title: note.title.trim() || "Untitled note",
    date: note.noteDate.toISOString(),
    color: note.color,
    url: `/notes/${note.id}/edit`,
  }));

  return NextResponse.json(Result.successResult(events).toJSON());
}
