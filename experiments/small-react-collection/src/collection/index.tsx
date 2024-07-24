import { AnimatedNumberApp } from "./AnimatedNumber";
import { CheckUseValueRef } from "./CheckUseValueRef";
import { RerenderParentChildren } from "./RerenderParentChildren";
import { RerenderContextConsumersFromSameContext } from "./RerenderContextConsumersFromSameContext";
import { RerenderContextConsumersFromDifferentContexts } from "./RerenderContextConsumersFromDifferentContexts";

export const COLLECTION: Array<{
  name: string;
  component: React.FunctionComponent;
}> = [
  {
    name: "Animated Number",
    component: AnimatedNumberApp,
  },
  {
    name: "Re-render: Context Consumers + The same Provider",
    component: RerenderContextConsumersFromSameContext,
  },
  {
    name: "Re-render: Context Consumers + Different Providers",
    component: RerenderContextConsumersFromDifferentContexts,
  },
  {
    name: "Re-render: Parent-children relationship",
    component: RerenderParentChildren,
  },
  {
    name: "Check useValueRef",
    component: CheckUseValueRef,
  },
];
