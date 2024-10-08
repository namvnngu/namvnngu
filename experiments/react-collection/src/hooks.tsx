import React from "react";
import { clamp } from "./utils";

const DEFAULT_USE_COUNTER_OPTIONS = {
  min: -Infinity,
  max: Infinity,
};
export function useCounter(
  initialValue = 0,
  options?: { min?: number; max?: number },
) {
  const min = options?.min ?? DEFAULT_USE_COUNTER_OPTIONS.min;
  const max = options?.max ?? DEFAULT_USE_COUNTER_OPTIONS.max;

  const [count, setCount] = React.useState(clamp(initialValue, min, max));

  const increment = React.useCallback(
    () => setCount((current) => clamp(current + 1, min, max)),
    [max, min],
  );
  const decrement = React.useCallback(
    () => setCount((current) => clamp(current - 1, min, max)),
    [max, min],
  );
  const set = React.useCallback(
    (value: number) => setCount(clamp(value, min, max)),
    [max, min],
  );
  const reset = React.useCallback(
    () => setCount(clamp(initialValue, min, max)),
    [initialValue, max, min],
  );

  return [count, { increment, decrement, set, reset }] as const;
}
