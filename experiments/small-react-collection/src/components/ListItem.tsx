import React from "react";
import { classes } from "../utils";

type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  active?: boolean;
};

export function ListItem(props: ListItemProps) {
  const className = classes(
    props.active
      ? "block cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
      : "block cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700",
    props.className,
  );
  return (
    <li {...props} className={className}>
      {props.children}
    </li>
  );
}
