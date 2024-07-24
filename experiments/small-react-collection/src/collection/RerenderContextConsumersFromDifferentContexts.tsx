import React from "react";

import { Button } from "../components/Button";
import { useLog } from "../components/Logger";

/* ------------------------------------------------------------------------- */

const APP_NAME = "RerenderContextConsumersFromDifferentContexts";

const RerenderContextConsumersFromDifferentContexts: React.FC = () => {
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
};

RerenderContextConsumersFromDifferentContexts.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

type ContextAValue = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const ContextA = React.createContext<ContextAValue>({
  count: 0,
  setCount: () => void 0,
});
const CONTEXT_PROVIDER_A_NAME = "ContextProviderA";

const ContextProviderA: React.FC<React.PropsWithChildren> = (props) => {
  const [count, setCount] = React.useState(0);
  return (
    <ContextA.Provider value={{ count, setCount }}>
      {props.children}
    </ContextA.Provider>
  );
};

ContextProviderA.displayName = CONTEXT_PROVIDER_A_NAME;

/* ------------------------------------------------------------------------- */

const BUTTON_A_NAME = "ButtonA";

const ButtonA: React.FC = () => {
  const { count, setCount } = React.useContext(ContextA);
  const log = useLog(BUTTON_A_NAME);

  React.useEffect(() => {
    log("Button A re-render");
  });

  return <Button onClick={() => setCount((c) => ++c)}>A: {count}</Button>;
};

ButtonA.displayName = BUTTON_A_NAME;

/* ------------------------------------------------------------------------- */

type ContextBValue = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const ContextB = React.createContext<ContextBValue>({
  count: 0,
  setCount: () => void 0,
});

const CONTEXT_PROVIDER_B_NAME = "ContextProviderB";

const ContextProviderB: React.FC<React.PropsWithChildren> = (props) => {
  const [count, setCount] = React.useState(0);
  return (
    <ContextB.Provider value={{ count, setCount }}>
      {props.children}
    </ContextB.Provider>
  );
};

ContextProviderB.displayName = CONTEXT_PROVIDER_B_NAME;

/* ------------------------------------------------------------------------- */

const BUTTON_B_NAME = "ButtonB";

const ButtonB: React.FC = () => {
  const { count, setCount } = React.useContext(ContextB);
  const log = useLog(BUTTON_B_NAME);

  React.useEffect(() => {
    log("Button B re-render");
  });

  return <Button onClick={() => setCount((c) => ++c)}>B: {count}</Button>;
};

ButtonB.displayName = BUTTON_B_NAME;

/* ------------------------------------------------------------------------- */

export { RerenderContextConsumersFromDifferentContexts };
