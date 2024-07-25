import React from "react";

import { classes } from "../utils";

/* ------------------------------------------------------------------------- */

const LIST_ITEM_NAME = "ListItem";

type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  active?: boolean;
};

const ListItem: React.FC<ListItemProps> = (props) => {
  const { active, ...rest } = props;
  const className = classes(
    active
      ? "block cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
      : "block cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700",
    props.className,
  );
  return (
    <li {...rest} className={className}>
      {props.children}
    </li>
  );
};

ListItem.displayName = LIST_ITEM_NAME;

/* ------------------------------------------------------------------------- */

export { ListItem };
export type { ListItemProps };
