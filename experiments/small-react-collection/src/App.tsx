import React from "react";
import ReactDOM from "react-dom";

import { COLLECTION } from "./collection";
import { Close } from "./components/Close";
import { Button } from "./components/Button";
import { ListItem } from "./components/ListItem";

export default function App() {
  const [selected, setSelected] = React.useState(0);

  const Example = COLLECTION[selected]?.component;

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

/*****************************************************************************/

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
                {COLLECTION.map((e, index) => (
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
