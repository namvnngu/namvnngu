import React from "react";

import { Button } from "./Button";
import { AnimatedNumberApp } from "./AnimatedNumber";
import { RerenderParentChildren } from "./RerenderParentChildren";
import { RerenderContextConsumersFromSameContext } from "./RerenderContextConsumersFromSameContext";
import { RerenderContextConsumersFromDifferentContexts } from "./RerenderContextConsumersFromDifferentContexts";

const examples: Array<{ name: string; component: React.FunctionComponent }> = [
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

  const Example = examples[selected]?.component;

  return (
    <div className="container mx-auto p-8">
      <header>
        <ul className="flex flex-wrap gap-2">
          {examples.map((e, index) => (
            <li key={e.name}>
              <Button
                theme={selected === index ? "dark" : "light"}
                onClick={() => setSelected(index)}
              >
                {e.name}
              </Button>
            </li>
          ))}
        </ul>
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
