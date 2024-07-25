import React from "react";

import { Theme } from "../types";
import { classes } from "../utils";

/* ------------------------------------------------------------------------- */

const BUTTON_NAME = "Button";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  theme?: Theme;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { theme: _, ...buttonProps } = props;

  const themeClassName = (function () {
    switch (props.theme) {
      case "dark":
        return "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
      default:
        return "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
    }
  })();

  return (
    <button
      {...buttonProps}
      className={classes(themeClassName, props.className)}
    >
      {props.children}
    </button>
  );
};

Button.displayName = BUTTON_NAME;

/* ------------------------------------------------------------------------- */

export { Button };
export type { ButtonProps };
