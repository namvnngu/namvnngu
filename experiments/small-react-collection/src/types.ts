import { COLORS } from "./constants";

type Theme = "light" | "dark";

type Color = (typeof COLORS)[number];

export type { Theme, Color };
