import React from "react";
import { Button } from "../components/Button";

export function RerenderContextConsumersFromSameContext() {
  return (
    <ContextProvider>
      <div className="flex gap-2">
        <ButtonA />
        <br />
        <ButtonB />
      </div>
    </ContextProvider>
  );
}

/*****************************************************************************/

type Context = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Context = React.createContext<Context>({
  count: 0,
  setCount: () => void 0,
});
function ContextProvider(props: React.PropsWithChildren) {
  const [count, setCount] = React.useState(0);
  return (
    <Context.Provider value={{ count, setCount }}>
      {props.children}
    </Context.Provider>
  );
}

function ButtonA() {
  const { count, setCount } = React.useContext(Context);
  console.log("Button A re-render");
  return <Button onClick={() => setCount((c) => ++c)}>A: {count}</Button>;
}

function ButtonB() {
  const { count, setCount } = React.useContext(Context);
  console.log("Button B re-render");
  return <Button onClick={() => setCount((c) => ++c)}>B: {count}</Button>;
}
