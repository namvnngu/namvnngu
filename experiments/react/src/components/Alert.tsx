import React from "react";

import { classes } from "../utils";
import { Close, CloseProps } from "./Close";

/* ------------------------------------------------------------------------- */

const ALERT_NAME = "Alert";

type AlertProps = React.ComponentPropsWithoutRef<"div"> & {
  title: React.ReactNode;
  desc?: React.ReactNode;
  onClose?: CloseProps["onClick"];
};

const Alert: React.FC<AlertProps> = (props) => {
  const { title: _, desc: __, ...divProps } = props;
  return (
    <div
      {...divProps}
      role="alert"
      className={classes(
        "space-y-1 rounded-xl border border-gray-200 bg-white p-4",
        props.className,
      )}
    >
      <div className="flex items-center gap-4">
        <strong className="flex-1 text-base font-medium text-gray-900">
          {props.title}
        </strong>
        <Close onClick={props.onClose} />
      </div>
      {props.desc ? (
        <div className="text-sm text-gray-700">{props.desc}</div>
      ) : null}
    </div>
  );
};

Alert.displayName = ALERT_NAME;

/* ------------------------------------------------------------------------- */

export { Alert };
export type { AlertProps };
