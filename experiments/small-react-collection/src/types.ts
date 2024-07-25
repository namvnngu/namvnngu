import { COLORS } from "./constants";

type Theme = "light" | "dark";

type Color = (typeof COLORS)[number];

type PartialSome<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type { Theme, Color, PartialSome };
