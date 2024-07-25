import React from "react";
import { Button } from "../components/Button";
import { useLog } from "../components/Logger";

/* ------------------------------------------------------------------------- */

const APP_NAME = "RerenderParentChildren";

const RerenderParentChildren: React.FC = () => {
  return (
    <Parent>
      <Child />
    </Parent>
  );
};

RerenderParentChildren.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

const PARENT_NAME = "Parent";

const Parent: React.FC<React.PropsWithChildren> = (props) => {
  const [counter, setCounter] = React.useState(0);
  const log = useLog(PARENT_NAME);

  React.useEffect(() => {
    log.raise({ message: "Parent re-rendder", color: "lime" });
  });

  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Parent +1</Button>
      <div>{counter}</div>
      {props.children}
    </>
  );
};

Parent.displayName = PARENT_NAME;

/* ------------------------------------------------------------------------- */

const CHILD_NAME = "Child";

const Child: React.FC = () => {
  const log = useLog(CHILD_NAME);

  React.useEffect(() => {
    log.raise({ message: "Child re-rendder", color: "pink" });
  });

  return <div>Child</div>;
};

Child.displayName = CHILD_NAME;

/* ------------------------------------------------------------------------- */

export { RerenderParentChildren };
