import { NextResponse } from "next/server";
import { APP_ERRORS } from "@/constants/errors";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants/page";
import { Result } from "@/models/result";
import { notesPaginationQuerySchema } from "@/schemas/note";
import { getNotes } from "@/services/notes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsedQuery = notesPaginationQuerySchema.safeParse({
    page: searchParams.get("page") ?? String(DEFAULT_PAGE),
    pageSize: searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE),
  });

  if (!parsedQuery.success) {
    return NextResponse.json(
      Result.failureResult({
        key: APP_ERRORS.INVALID_PAGINATION_QUERY.key,
        message: APP_ERRORS.INVALID_PAGINATION_QUERY.message,
      }).toJSON(),
      { status: 400 },
    );
  }

  const result = await getNotes(parsedQuery.data.page, parsedQuery.data.pageSize);

  if (!result.success) {
    const status = result.error?.key === APP_ERRORS.PAGE_NOT_FOUND.key ? 404 : 500;

    return NextResponse.json(
      Result.failureResult({
        key: result.error?.key ?? APP_ERRORS.INVALID_INPUT.key,
        message: result.error?.message ?? "failed",
      }).toJSON(),
      { status },
    );
  }

  return NextResponse.json(result.toJSON());
}