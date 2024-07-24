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

export { classes, getRandomColor };
