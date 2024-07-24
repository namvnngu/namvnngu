import React from "react";
import { v4 as uuid } from "uuid";

type Message = {
  id: string;
  text: string;
};

const RerenderContext = React.createContext<
  { rerender: (text: string) => void } | undefined
>(undefined);

export function RerenderProvider(props: React.PropsWithChildren) {
  const [messages, setMessages] = React.useState<
    Record<Message["id"], Message>
  >({});

  const rerender = React.useCallback((text: string) => {
    const id = uuid();
    setMessages((current) => ({ ...current, [id]: { id, text } }));
  }, []);

  const value = React.useMemo(() => ({ rerender }), [rerender]);

  return (
    <RerenderContext.Provider value={value}>
      {props.children}
    </RerenderContext.Provider>
  );
}

export function useRerender(componentName: string) {
  React.useEffect(() => {});
}
