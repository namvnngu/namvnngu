import React from "react";

import { Button } from "../components/Button";
import { useLog } from "../components/Logger";

/* ------------------------------------------------------------------------- */

const APP_NAME = "RerenderContextConsumersFromSameContext";

const RerenderContextConsumersFromSameContext: React.FC = () => {
  return (
    <ContextProvider>
      <div className="flex gap-2">
        <ButtonA />
        <br />
        <ButtonB />
      </div>
    </ContextProvider>
  );
};

RerenderContextConsumersFromSameContext.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

type Context = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const Context = React.createContext<Context>({
  count: 0,
  setCount: () => void 0,
});

const CONTEXT_PROVIDER_NAME = "ContextProvider";

const ContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [count, setCount] = React.useState(0);
  return (
    <Context.Provider value={{ count, setCount }}>
      {props.children}
    </Context.Provider>
  );
};

ContextProvider.displayName = CONTEXT_PROVIDER_NAME;

/* ------------------------------------------------------------------------- */

const BUTTON_A_NAME = "ButtonA";

const ButtonA: React.FC = () => {
  const { count, setCount } = React.useContext(Context);
  const log = useLog(BUTTON_A_NAME);

  React.useEffect(() => {
    log.raise({ message: "Button A re-render", color: "violet" });
  });

  return <Button onClick={() => setCount((c) => ++c)}>A: {count}</Button>;
};

ButtonA.displayName = BUTTON_A_NAME;

/* ------------------------------------------------------------------------- */

const BUTTON_B_NAME = "ButtonB";

const ButtonB: React.FC = () => {
  const { count, setCount } = React.useContext(Context);
  const log = useLog(BUTTON_B_NAME);

  React.useEffect(() => {
    log.raise({ message: "Button B re-render", color: "sky" });
  });

  return <Button onClick={() => setCount((c) => ++c)}>B: {count}</Button>;
};

ButtonB.displayName = BUTTON_B_NAME;

/* ------------------------------------------------------------------------- */

export { RerenderContextConsumersFromSameContext };
