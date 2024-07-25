import React from "react";

import { classes } from "../utils";
import { Close, CloseProps } from "./Close";

/* ------------------------------------------------------------------------- */

const ALERT_NAME = "Alert";

type AlertProps = React.ComponentPropsWithoutRef<"div"> & {
  title: React.ReactNode;
  desc?: React.ReactNode;
  icon?: React.ReactElement;
  onClose?: CloseProps["onClick"];
};

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div
      {...props}
      role="alert"
      className={classes(
        "rounded-xl border border-gray-200 bg-white p-4",
        props.className,
      )}
    >
      <div className="flex items-start gap-4">
        {props.icon}
        <div className="flex-1">
          <strong className="block text-base font-medium text-gray-900">
            {props.title}
          </strong>

          {props.desc ? (
            <div className="mt-1 text-sm text-gray-700">{props.desc}</div>
          ) : null}
        </div>
        <Close onClick={props.onClose} />
      </div>
    </div>
  );
};

Alert.displayName = ALERT_NAME;

/* ------------------------------------------------------------------------- */

export { Alert };
export type { AlertProps };
