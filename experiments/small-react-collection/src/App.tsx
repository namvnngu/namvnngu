import React from "react";

import { Menu } from "./components/Menu";
import { COLLECTION } from "./collection";
import { ListItem } from "./components/ListItem";

export default function App() {
  const [selected, setSelected] = React.useState(0);

  const Example = COLLECTION[selected]?.component;

  return (
    <div className="container mx-auto p-8">
      <header>
        <Menu>
          {({ onClose }) => (
            <>
              {COLLECTION.map((e, index) => (
                <ListItem
                  key={e.name}
                  active={index === selected}
                  onClick={() => {
                    setSelected(index);
                    onClose();
                  }}
                >
                  {e.name}
                </ListItem>
              ))}
            </>
          )}
        </Menu>
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
