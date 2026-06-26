import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
