import React from "react";
import { Button } from "../components/Button";

export function CheckUseValueRef() {
  const [count, setCount] = React.useState(0);
  const countRef = useValueRef(count);

  React.useEffect(() => {
    console.log("useEffect runs", countRef.current);
  }, [countRef]);

  console.log("re-render", count);

  return (
      <Button onClick={() => setCount((c) => ++c)}>Increment {count}</Button>
  );
}

function useValueRef<T>(value: T): { current: T } {
  const valueRef = React.useRef<T>(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}
