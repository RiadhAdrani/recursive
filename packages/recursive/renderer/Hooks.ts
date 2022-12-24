import { hasProperty } from "@riadh-adrani/utility-js";
import { RecursiveRawElement } from "./Element";

export enum HookType {
  onCreated = "onCreated",
  onDestroyed = "onDestroyed",
  onUpdated = "onUpdated",
  beforeDestroyed = "beforeDestroyed",
  onRef = "onRef",
  onPrepared = "onPrepared",
  beforePrepared = "beforePrepared",
}

export interface Hooks<E> {
  onCreated?: (el: E) => void;
  onDestroyed?: () => void;
  onUpdated?: (el: E) => void;
  beforeDestroyed?: (el: E) => void;
  onRef?: (el: E) => string | void;
  onPrepared?: (el: RecursiveRawElement) => void;
  beforePrepared?: (el: RecursiveRawElement) => void;
}

const list = {
  [HookType.onCreated]: { type: "function" },
  [HookType.onDestroyed]: { type: "function" },
  [HookType.onUpdated]: { type: "function" },
  [HookType.beforeDestroyed]: { type: "function" },
  [HookType.onRef]: { type: "function" },
  [HookType.onPrepared]: { type: "function" },
  [HookType.beforePrepared]: { type: "function" },
};

function is(key: string): boolean {
  return hasProperty(list, key);
}

export const hooks = {
  is,
  list,
};
