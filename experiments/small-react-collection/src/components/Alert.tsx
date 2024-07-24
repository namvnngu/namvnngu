import React from "react";
import { classes } from "../utils";
import { Close } from "./Close";

type ToastProps = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  description?: string;
  icon?: React.ReactElement;
};
export function Alert(props: ToastProps) {
  return (
    <div
      {...props}
      role="alert"
      className={classes(
        "rounded-xl border border-gray-100 bg-white p-4",
        props.className,
      )}
    >
      <div className="flex items-start gap-4">
        {props.icon}
        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            {props.title}
          </strong>

          {props.description ? (
            <p className="mt-1 text-sm text-gray-700">{props.description}</p>
          ) : null}
        </div>
        <Close />
      </div>
    </div>
  );
}
