import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";

import { Alert } from "./Alert";
import { COLORS } from "../constants";
import { getRandomColor } from "../utils";
import type { Color } from "../types";

/* ------------------------------------------------------------------------- */

const LOGGER_NAME = "Logger";

const LoggerContext = React.createContext<
  { log: (message: string) => void } | undefined
>(undefined);

type Log = {
  id: string;
  message: string;
  color: Color;
};

type LoggerProps = React.PropsWithChildren;

const Logger: React.FC<LoggerProps> = (props) => {
  const [logs, setLogs] = React.useState<Log[]>([]);

  const log = React.useCallback((message: string) => {
    const id = uuid();
    const color = getRandomColor();
    setLogs((current) => [...current, { id, message, color }]);
  }, []);

  const value = React.useMemo(() => ({ log }), [log]);

  return (
    <LoggerContext.Provider value={value}>
      {props.children}
      <Console logs={logs} onLogs={setLogs} />
    </LoggerContext.Provider>
  );
};

Logger.displayName = LOGGER_NAME;

/* ------------------------------------------------------------------------- */

const CONSOLE_NAME = "Console";

const COLOR_CLASS_NAMES = Object.fromEntries(
  COLORS.map((c) => [c, `text-${c}-700`]),
) as Record<Color, string>;

type ConsoleProps = {
  logs: Log[];
  onLogs: (logs: Log[]) => void;
};

const Console: React.FC<ConsoleProps> = (props) => {
  if (props.logs.length === 0) {
    return null;
  }
  return ReactDOM.createPortal(
    <Alert
      className="fixed right-4 bottom-4 min-w-80"
      title="Logs"
      onClose={() => props.onLogs([])}
      desc={
        <ul>
          {Object.values(props.logs).map((l) => (
            <li key={l.id} className={COLOR_CLASS_NAMES[l.color]}>
              {l.message}
            </li>
          ))}
        </ul>
      }
    />,
    document.body,
  );
};

Console.displayName = CONSOLE_NAME;

/* ------------------------------------------------------------------------- */

function useLog(componentName: string): (message: string) => void {
  const context = React.useContext(LoggerContext);
  if (context === undefined) {
    throw new Error(`${componentName} must be used within Logger`);
  }
  return context.log;
}

/* ------------------------------------------------------------------------- */

export { Logger, useLog };
export type { LoggerProps };
