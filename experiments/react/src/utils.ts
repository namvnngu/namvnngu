import type { Color } from "./types";
import { COLORS } from "./constants";

function classes(
  ...classNames: (string | undefined | null)[]
): string | undefined {
  let result = "";

  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    if (!className) continue;

    if (i === classNames.length - 1) {
      result += className;
    } else {
      result += `${className} `;
    }
  }

  return result ? result : undefined;
}

function getRandomColor(): Color {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric",
    timeZoneName: "shortOffset",
  });
}

function clamp(
  value: number,
  min: number | undefined,
  max: number | undefined,
): number {
  if (min === undefined && max === undefined) {
    return value;
  }

  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }

  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }

  return Math.min(Math.max(value, min!), max!);
}

export { classes, getRandomColor, formatDate, clamp };
