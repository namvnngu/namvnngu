import React from "react";

import { Menu } from "./components/Menu";
import { COLLECTION } from "./collection";
import { ListItem } from "./components/ListItem";
import { Logger, useLog } from "./components/Logger";

/* ------------------------------------------------------------------------- */

const APP_NAME = "App";

const App: React.FC = () => {
  return (
    <Logger>
      <AppInternal />
    </Logger>
  );
};

App.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

const APP_INTERNAL_NAME = "AppInternal";

const AppInternal: React.FC = () => {
  const [selected, setSelected] = React.useState(0);
  const log = useLog(APP_INTERNAL_NAME);

  const Example = COLLECTION[selected]?.component;

  React.useEffect(() => {
    log.clean();
  }, [selected, log]);

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
};

AppInternal.displayName = APP_INTERNAL_NAME;

/* ------------------------------------------------------------------------- */

export { App };
