import { Action } from "../task";
import { Component } from "./Component";

export type CoreTasks = {
  mounted: Action[];
  updated: Action[];
  unmounted: Action[];
  beforeUnmounted: Action[];
  committed: Action[];
};

export type CoreContext<I, E, S> = {
  parent: Component<I, E, S>;
};

export type StoreCollectionItem<T = unknown> = {
  value: T;
  history: T[];
  onRemoved?: () => void;
  addOrder: number;
  global: boolean;
};

export type Callback = () => (() => void) | void;

export type StoreCollectionItemOptions<T = unknown> = {
  key: string;
  value: T;
  onCreated?: Callback;
  global: boolean;
};

export type StoreCollectionOptions = {
  set: <T>(options: StoreCollectionItemOptions<T>) => StateArray<T>;
  get: <T>(key: string) => StateArray<T>;
  clear: () => void;
};

export type StoreCollection = {
  items: Record<string, StoreCollectionItem>;
  used: string[];
} & StoreCollectionOptions;

export type StateArray<T = undefined> = [T, (value: T) => void, () => T | undefined, T[]];

export type EffectItemOptions = {
  key: string;
  callback: Callback;
  dependencies: unknown[];
};

export type EffectItem = {
  executed: boolean;
  cleanUp?: Callback;
} & EffectItemOptions;

export type EffectCollection = {
  items: Record<string, EffectItem>;
  used: string[];
  queue: Callback[];
};
