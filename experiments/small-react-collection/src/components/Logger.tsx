import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";

import { Alert } from "./Alert";
import { COLORS } from "../constants";
import { getRandomColor } from "../utils";
import type { Color, PartialSome } from "../types";

/* ------------------------------------------------------------------------- */

const LOGGER_NAME = "Logger";

type Log = {
  id: string;
  message: string;
  color: Color;
};

type LoggerContextValue = {
  raise: (log: PartialSome<Log, "id" | "color">) => void;
  clean: () => void;
};

const LoggerContext = React.createContext<LoggerContextValue | undefined>(
  undefined,
);

type LoggerProps = React.PropsWithChildren;

const Logger: React.FC<LoggerProps> = (props) => {
  const [logs, setLogs] = React.useState<Log[]>([]);

  const raise = React.useCallback<LoggerContextValue["raise"]>((log) => {
    setLogs((current) => [
      ...current,
      {
        id: log.id ?? uuid(),
        message: log.message,
        color: log.color ?? getRandomColor(),
      },
    ]);
  }, []);

  const clean = React.useCallback<LoggerContextValue["clean"]>(() => {
    setLogs([]);
  }, []);

  const value = React.useMemo(() => ({ raise, clean }), [raise, clean]);

  return (
    <LoggerContext.Provider value={value}>
      {props.children}
      <Console logs={logs} onLogs={setLogs} />
    </LoggerContext.Provider>
  );
};

Logger.displayName = LOGGER_NAME;

/* ------------------------------------------------------------------------- */

const COLOR_CLASS_NAMES: Record<Color, string> = {
  slate: "text-slate-700",
  gray: "text-gray-700",
  zinc: "text-zinc-700",
  neutral: "text-neutral-700",
  stone: "text-stone-700",
  red: "text-red-700",
  orange: "text-orange-700",
  amber: "text-amber-700",
  yellow: "text-yellow-700",
  lime: "text-lime-700",
  green: "text-green-700",
  emerald: "text-emerald-700",
  teal: "text-teal-700",
  cyan: "text-cyan-700",
  sky: "text-sky-700",
  blue: "text-blue-700",
  indigo: "text-indigo-700",
  violet: "text-violet-700",
  purple: "text-purple-700",
  fuchsia: "text-fuchsia-700",
  pink: "text-pink-700",
  rose: "text-rose-700",
};

const CONSOLE_NAME = "Console";

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

function useLog(componentName: string): LoggerContextValue {
  const context = React.useContext(LoggerContext);
  if (context === undefined) {
    throw new Error(`${componentName} must be used within Logger`);
  }
  return context;
}

/* ------------------------------------------------------------------------- */

export { Logger, useLog };
export type { LoggerProps };
