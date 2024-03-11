import React from "react";
import ReactDOM from "react-dom";

import { Close } from "./Close";
import { Button } from "./Button";

/* ------------------------------------------------------------------------- */

const MENU_NAME = "Menu";

type MenuProps = {
  children: (props: { onClose: () => void }) => React.ReactElement;
};

const Menu: React.FC<MenuProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

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
              <ul className="space-y-1">{props.children({ onClose })}</ul>
            </div>,
            document.body,
          )}
        </>
      ) : null}
    </>
  );
};

Menu.displayName = MENU_NAME;

/* ------------------------------------------------------------------------- */

export { Menu };
export type { MenuProps };
