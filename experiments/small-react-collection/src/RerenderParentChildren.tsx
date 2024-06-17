import React from "react";
import { Button } from "./Button";

export function RerenderParentChildren() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}

function Parent(props: React.PropsWithChildren) {
  console.log("Parent re-rendder");

  const [counter, setCounter] = React.useState(0);
  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Parent +1</Button>
      <div>{counter}</div>
      {props.children}
    </>
  );
}

function Child() {
  console.log("Child re-rendder");

  return <div>Child</div>;
}
