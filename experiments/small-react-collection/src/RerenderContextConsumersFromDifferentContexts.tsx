import React from "react";
import { Button } from "./Button";

export function RerenderContextConsumersFromDifferentContexts() {
  return (
    <ContextProviderA>
      <ContextProviderB>
        <div className="flex gap-2">
          <ButtonA />
          <br />
          <ButtonB />
        </div>
      </ContextProviderB>
    </ContextProviderA>
  );
}

type Context = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const ContextA = React.createContext<Context>({
  count: 0,
  setCount: () => void 0,
});
function ContextProviderA(props: React.PropsWithChildren) {
  const [count, setCount] = React.useState(0);
  return (
    <ContextA.Provider value={{ count, setCount }}>
      {props.children}
    </ContextA.Provider>
  );
}
function ButtonA() {
  const { count, setCount } = React.useContext(ContextA);
  console.log("Button A re-render");
  return <Button onClick={() => setCount((c) => ++c)}>A: {count}</Button>;
}

const ContextB = React.createContext<Context>({
  count: 0,
  setCount: () => void 0,
});
function ContextProviderB(props: React.PropsWithChildren) {
  const [count, setCount] = React.useState(0);
  return (
    <ContextB.Provider value={{ count, setCount }}>
      {props.children}
    </ContextB.Provider>
  );
}
function ButtonB() {
  const { count, setCount } = React.useContext(ContextB);
  console.log("Button B re-render");
  return <Button onClick={() => setCount((c) => ++c)}>B: {count}</Button>;
}
