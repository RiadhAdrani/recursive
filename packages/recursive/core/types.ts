import { Action } from "../task";
import { Component, ComponentAttribute, ComponentEvent } from "./Component";

export type CoreTasks = {
  mounted: Action[];
  updated: Action[];
  unmounted: Action[];
  beforeUnmounted: Action[];
  committed: Action[];
};

export type CoreContext<I, E> = {
  parent?: Component<I, E>;
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

export type ComponentImplementation<I, E> = {
  attributes: {
    add: (component: Component<I, E>, attr: string, value: ComponentAttribute) => void;
    update: (component: Component<I, E>, attr: string, value: ComponentAttribute) => void;
    remove: (component: Component<I, E>, attr: string) => void;
    is: (attr: string, value: unknown) => boolean;
  };
  events: {
    add: (component: Component<I, E>, ev: string, value: ComponentEvent<E>) => void;
    update: (component: Component<I, E>, ev: string, value: ComponentEvent<E>) => void;
    remove: (component: Component<I, E>, ev: string) => void;
    is: (ev: string, value: unknown) => boolean;
  };
  instance: {
    changeChildPosition: (parent: Component<I, E>, oldPos: number, newPos: number) => void;
    addChild: (parent: Component<I, E>, child: Component<I, E>, pos: number) => void;
    remove: (component: Component<I, E>) => void;
    replace: (oldComponent: Component<I, E>, newComponent: Component<I, E>) => void;
    render: (component: Component<I, E>) => I;
  };
};

export type RouterImplementation = {
  replace: (path: string) => void;
  push: (path: string) => void;
  scrollToTop: () => void;
  goToAnchor: (anchor: string) => void;
  setNavigationListener: (navigate: (path: string) => void) => void;
  getRoute: () => string;
  setTitle: (title: string) => void;
};
