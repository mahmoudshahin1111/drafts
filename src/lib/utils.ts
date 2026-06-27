import { clsx, type ClassValue } from "clsx"
import { format, isValid, parse, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"
import { SUPPORTED_NOTE_DATE_FORMAT } from "@/constants/date"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pluralizeWord(
  count: number,
  singular: string,
  plural?: string
) {
  if (count === 1) {
    return singular
  }

  return plural ?? `${singular}s`
}

const DATE_VALUE_FORMAT = "yyyy-MM-dd'T'HH:mm"
const DATE_INPUT_FORMAT = "yyyy-MM-dd"
const TIME_INPUT_FORMAT = "HH:mm"

export function splitDate(value?: string) {
  if (!value) {
    return { date: "", time: "" }
  }

  const parsedValue = parseISO(value)

  if (!isValid(parsedValue)) {
    return { date: "", time: "" }
  }

  return {
    date: format(parsedValue, DATE_INPUT_FORMAT),
    time: format(parsedValue, TIME_INPUT_FORMAT),
  }
}

export function mergeDate(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) {
    return ""
  }

  const mergedDate = parse(
    `${dateValue} ${timeValue}`,
    "yyyy-MM-dd HH:mm",
    new Date(),
  )

  if (!isValid(mergedDate)) {
    return ""
  }

  return format(mergedDate, DATE_VALUE_FORMAT)
}

export function getCurrentDate() {
  return format(new Date(), SUPPORTED_NOTE_DATE_FORMAT)
}
