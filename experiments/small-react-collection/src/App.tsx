import React from "react";
import ReactDOM from "react-dom";

import { Close } from "./Close";
import { Button } from "./Button";
import { ListItem } from "./ListItem";
import { AnimatedNumberApp } from "./AnimatedNumber";
import { RerenderParentChildren } from "./RerenderParentChildren";
import { RerenderContextConsumersFromSameContext } from "./RerenderContextConsumersFromSameContext";
import { RerenderContextConsumersFromDifferentContexts } from "./RerenderContextConsumersFromDifferentContexts";

const EXAMPLES: Array<{ name: string; component: React.FunctionComponent }> = [
  {
    name: "Animated Number",
    component: AnimatedNumberApp,
  },
  {
    name: "Re-render: Context Consumers + The same Provider",
    component: RerenderContextConsumersFromSameContext,
  },
  {
    name: "Re-render: Context Consumers + Different Providers",
    component: RerenderContextConsumersFromDifferentContexts,
  },
  {
    name: "Re-render: Parent-children relationship",
    component: RerenderParentChildren,
  },
];

export default function App() {
  const [selected, setSelected] = React.useState(0);

  const Example = EXAMPLES[selected]?.component;

  return (
    <div className="container mx-auto p-8">
      <header>
        <Menu selected={selected} onSelect={setSelected} />
      </header>
      <main className="mt-8">
        {Example ? (
          <Example />
        ) : (
          "No corresponding example given the selected option"
        )}
      </main>
    </div>
  );
}

function Menu(props: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button theme="dark" onClick={() => setOpen(true)}>
        Menu
      </Button>
      {open ? (
        <>
          {ReactDOM.createPortal(
            <div className="absolute top-0 left-0 space-y-2 min-w-64 h-screen border-e bg-white px-4 py-6">
              <Close className="block ml-auto" onClick={() => setOpen(false)} />
              <ul className="space-y-1">
                {EXAMPLES.map((e, index) => (
                  <ListItem
                    key={e.name}
                    active={index === props.selected}
                    onClick={() => {
                      props.onSelect?.(index);
                      setOpen(false);
                    }}
                  >
                    {e.name}
                  </ListItem>
                ))}
              </ul>
            </div>,
            document.body,
          )}
        </>
      ) : null}
    </>
  );
}
