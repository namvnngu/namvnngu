import React from "react";

import { Button } from "../components/Button";
import { useLog } from "../components/Logger";

/* ------------------------------------------------------------------------- */

const APP_NAME = "CheckUseValueRef";

const CheckUseValueRef: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const countRef = useValueRef(count);
  const log = useLog(APP_NAME);

  React.useEffect(() => {
    log.raise({ message: `useEffect runs with ${countRef.current}`, color: "red" });
  }, [countRef, log]);

  React.useEffect(() => {
    log.raise({ message: `re-render with ${count}`, color: "green" });
  });

  return (
    <Button onClick={() => setCount((c) => ++c)}>Increment {count}</Button>
  );
};

function useValueRef<T>(value: T): { current: T } {
  const valueRef = React.useRef<T>(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

CheckUseValueRef.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

export { CheckUseValueRef };
