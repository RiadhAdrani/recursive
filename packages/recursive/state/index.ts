import { areEqual, copy, hasProperty, isBlank, isFunction } from "@riadh-adrani/utility-js";
import { RecursiveApp } from "../app";
import { RError } from "../console";
import { RecursiveOrchestrator } from "../orchestrator";
import Cache from "./Cache";
import Effect from "./Effect";
import Reference from "./Reference";
import Reserved from "./Reserved";
import State from "./State";

export enum StoreType {
  STATE = "state",
  CACHE = "cache",
  RESERVED = "reserved",
  REFERENCE = "reference",
  EFFECT = "effect",
}

export type ItemArray<T> = [T, (value: T) => void, () => T];

export type EffectCallback = () => (() => void) | void;

export type StoreItem<T = unknown> = {
  value: T;
  history: Array<T>;
  first: boolean;
  order: number;
  onCreated?: EffectCallback;
  onRemoved?: () => void;
};

export type Store = {
  items: Record<string, StoreItem>;
  used: Array<string>;
  set: <T>(key: string, value: T, onCreated?: EffectCallback) => ItemArray<T>;
  get: <T>(key: string) => ItemArray<T>;
  clear: () => void;
};

export type Stores = {
  [StoreType.STATE]: Store;
  [StoreType.CACHE]: Store;
  [StoreType.EFFECT]: Store;
  [StoreType.REFERENCE]: Store;
  [StoreType.RESERVED]: Store;
};

export class RecursiveStateManager {
  public cacheSize = 1000;
  public stores: Stores = {
    state: State(this),
    cache: Cache(this),
    effect: Effect(this),
    reference: Reference(this),
    reserved: Reserved(this),
  };
  public app: RecursiveApp;

  get orchestrator(): RecursiveOrchestrator {
    return this.app.orchestrator;
  }

  constructor(app: RecursiveApp) {
    this.app = app;
  }

  add<T>(store: StoreType, key: string, value: T, onCreated?: EffectCallback): void {
    if (!hasProperty(this.stores, store)) {
      throw new RError("invalid store key.");
    }

    if (isBlank(key)) {
      throw new RError("invalid state key.");
    }

    const order = Object.keys(this.stores[store].items).length;

    const item: StoreItem = { history: [], onCreated, order, value, first: true };

    this.stores[store].items[key] = item;
  }

  storeExists(store: string): boolean {
    return hasProperty(this.stores, store);
  }

  exists(store: StoreType, key: string): boolean {
    return this.storeExists(store) && hasProperty(this.stores[store], key);
  }

  get<T>(store: StoreType, key: string): StoreItem<T> {
    if (!this.exists(store, key)) {
      throw new RError("Invalid store/key");
    }

    return this.stores[store].items[key] as StoreItem<T>;
  }

  remove(store: StoreType, key: string): void {
    if (!this.exists(store, key)) {
      throw new RError("Invalid store/key");
    }

    const item = this.get(store, key);

    item.onRemoved?.();

    delete this.stores[store].items[key];
  }

  update<T>(
    store: StoreType,
    key: string,
    newValue: T,
    onChanged?: () => void,
    forceUpdate?: boolean
  ): void {
    if (!this.exists(store, key)) {
      throw new RError("Invalid store/key");
    }

    const item = this.get(store, key);

    if (!areEqual(item.value, newValue) || forceUpdate) {
      item.history.push(copy(item.value));
      item.value = newValue;

      onChanged?.();
    }
  }

  setUsed(store: StoreType, key: string) {
    if (!this.exists(store, key)) {
      throw new RError("Invalid store/key");
    }

    this.stores[store].used.push(key);
  }

  isUsed(store: StoreType, key: string): boolean {
    if (!this.exists(store, key)) {
      throw new RError("Invalid store/key");
    }

    return this.stores[store].used.includes(key);
  }

  clear() {
    for (const store in this.stores) {
      this.stores[store as StoreType].clear();
    }
  }

  runEffects(): void {
    for (const storeName in this.stores) {
      const store = this.stores[storeName as StoreType];

      for (const key in store.items) {
        const item = this.get(storeName as StoreType, key);

        if (item.first) {
          const callback = item.onCreated?.();

          if (isFunction(callback)) {
            item.onRemoved = callback as () => void;
          }
        }
      }
    }
  }

  useBatchedCallback(callback: () => void, source?: string) {
    this.orchestrator.batchCallback(callback, source);
  }
}

export function getItemAsArray<T>(
  manager: RecursiveStateManager,
  store: StoreType,
  key: string
): ItemArray<T> {
  const item = manager.get<T>(store, key);

  const value = copy(item.value);

  const set = (value: T) => {
    if (!manager.exists(store, key)) return;

    manager.update(store, key, value, () => {
      manager.useBatchedCallback(() => {
        manager.orchestrator.notifyStateChanged();
      });
    });
  };

  const get = (): T => {
    return manager.get<T>(store, key).value;
  };

  return [value, set, get];
}
