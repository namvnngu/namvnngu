import React from "react";

import { Menu } from "./components/Menu";
import { COLLECTION } from "./collection";
import { Logger } from "./components/Logger";
import { ListItem } from "./components/ListItem";

/* ------------------------------------------------------------------------- */

const APP_NAME = "App";

const App: React.FC = () => {
  const [selected, setSelected] = React.useState(0);

  const Example = COLLECTION[selected]?.component;

  return (
    <Logger>
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
    </Logger>
  );
};

App.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

export { App };
