import { areEqual, hasProperty, isBlank, isFunction, copy } from "@riadh-adrani/utility-js";
import { run, throwError } from "../helpers";
import {
  Callback,
  EffectCollection,
  StateArray,
  StoreCollection,
  StoreCollectionItem,
} from "./types";

export const STATE_COLLECTION = "state";
export const REFERENCE_COLLECTION = "reference";
export const INTERNAL_COLLECTION = "internal";

export class Store {
  public onStateChanged: Callback;

  constructor(onStateChanged: Callback) {
    this.onStateChanged = onStateChanged;
  }

  public collections: Record<string, StoreCollection> = {
    [STATE_COLLECTION]: stateCollection(this),
    [INTERNAL_COLLECTION]: internalCollection(this),
    [REFERENCE_COLLECTION]: referenceCollection(this),
  };

  public effects: EffectCollection = { items: {}, used: [], queue: [] };

  effectExist(key: string) {
    return hasProperty(this.effects.items, key);
  }

  queueEffect(callback: Callback) {
    this.effects.queue.push(callback);
  }

  removeEffect(key: string) {
    const item = this.effects.items[key];

    delete this.effects.items[key];

    item.cleanUp?.();
  }

  addEffect(key: string, callback: Callback, dependencies: unknown[]) {
    const firstTime = !this.effectExist(key);

    if (!isFunction(callback)) {
      throwError(`effect (${key}) callback is not a function`, "State");
      return;
    }

    const launchEffect = () => {
      const cleanUp = callback() as Callback;

      this.effects.items[key].executed = true;

      if (isFunction(cleanUp)) {
        this.effects.items[key].cleanUp = cleanUp;
      }
    };

    if (firstTime) {
      this.effects.items[key] = {
        callback,
        cleanUp: undefined,
        dependencies,
        executed: false,
        key,
      };

      this.queueEffect(() => launchEffect());
    } else {
      const effect = this.effects.items[key];

      if (!areEqual(dependencies, effect.dependencies)) {
        run(() => effect.cleanUp?.());

        this.effects.items[key].executed = false;

        this.queueEffect(() => launchEffect());
      }
    }

    this.effects.used.push(key);
  }

  runEffects() {
    this.effects.queue.forEach((effect) => effect());
  }

  add<T>(collection: string, key: string, value: T, global = false, onCreated?: Callback): void {
    if (isBlank(key)) {
      throwError("key should be a valid string.", "State");
      return;
    }

    if (!this.collectionExists(collection)) {
      throwError("store does not exists", "State");
    }

    const item: StoreCollectionItem = {
      value,
      history: [],
      onRemoved: undefined,
      addOrder: Object.keys(this.collections[collection].items).length,
      global,
    };

    this.collections[collection].items[key] = item;

    if (isFunction(onCreated)) {
      this.queueEffect(() => {
        if (!this.exists(collection, key)) return;

        const res = onCreated?.() as () => void;

        if (isFunction(res)) {
          this.collections[collection].items[key].onRemoved = res;
        }
      });
    }
  }

  collectionExists(collection: string) {
    return hasProperty(this.collections, collection);
  }

  exists(collection: string, key: string) {
    return (
      this.collectionExists(collection) && hasProperty(this.collections[collection].items, key)
    );
  }

  get<T>(collection: string, key: string): StoreCollectionItem<T> {
    if (!this.exists(collection, key)) {
      throwError(`state (${key}) does not exist in collection (${collection})`);
    }

    return this.collections[collection].items[key] as StoreCollectionItem<T>;
  }

  remove(collection: string, key: string) {
    if (!this.exists(collection, key)) {
      throwError(`state (${key}) does not exist in collection (${collection})`);
    }

    const item = this.get(collection, key);

    const onRemoved = item.onRemoved;

    delete this.collections[collection].items[key];

    run(() => onRemoved?.());
  }

  update<T>(collection: string, key: string, value: T, forceUpdate = false): void {
    if (!this.exists(collection, key)) {
      throwError(`state (${key}) does not exist in collection (${collection})`);
    }

    const oldValue = this.get(collection, key).value as T;

    if (!areEqual(value, oldValue) || forceUpdate) {
      this.collections[collection].items[key].history.push(copy(oldValue));
      this.collections[collection].items[key].value = value;

      this.onStateChanged();
    }
  }

  setUsed(collection: string, key: string) {
    if (!this.exists(collection, key)) {
      throwError(`state (${key}) does not exist in collection (${collection})`);
    }

    this.collections[collection].used.push(key);
  }

  resetUsage(collection: string) {
    if (!this.collectionExists(collection)) {
      throwError(`collection (${collection}) does not exist.`);
    }

    this.collections[collection].used = [];
  }

  wasUsed(collection: string, key: string): boolean {
    return this.exists(collection, key) && this.collections[collection].used.includes(key);
  }

  clear() {
    Object.keys(this.collections).forEach((key) => {
      this.collections[key].clear();
    });

    Object.keys(this.effects).forEach((key) => {
      if (!this.effects.used.includes(key)) {
        this.removeEffect(key);
      }
    });

    this.effects.used = [];
    this.effects.queue = [];
  }
}

function retrieveCollectionStateItem<T>(
  store: Store,
  collection: string,
  key: string
): StateArray<T> {
  const item = store.get(collection, key);

  const value = copy(item.value);

  const set = (value: T) => {
    if (!store.exists(collection, key)) return;

    store.update(collection, key, value);
  };

  const get = (): T | undefined => {
    if (!store.exists(collection, key)) return undefined;

    return store.get<T>(collection, key).value;
  };

  const history = copy(item.history);

  return [value as T, set, get, history as T[]];
}

function stateCollection(store: Store): StoreCollection {
  const collection = STATE_COLLECTION;

  const retrieve = <T>(key: string): StateArray<T> =>
    retrieveCollectionStateItem(store, collection, key);

  return {
    items: {},
    used: [],
    set: ({ key, value, onCreated, global }) => {
      const firstTime = !store.exists(collection, key);

      if (firstTime) {
        store.add(collection, key, value, global, onCreated);
      }

      store.setUsed(collection, key);

      return retrieve(key);
    },
    get: (key: string) => {
      return retrieve(key);
    },
    clear: () => {
      Object.keys(store.collections[collection].items).forEach((key) => {
        const item = store.get(collection, key);

        if (store.wasUsed(collection, key) || item.global) return;

        store.remove(collection, key);
      });

      store.resetUsage(collection);
    },
  };
}

function internalCollection(store: Store): StoreCollection {
  const collection = INTERNAL_COLLECTION;

  const retrieve = <T>(key: string): StateArray<T> =>
    retrieveCollectionStateItem(store, collection, key);

  return {
    items: {},
    used: [],
    set: ({ key, value }) => {
      const firstTime = !store.exists(collection, key);

      if (firstTime) {
        store.add(collection, key, value, true);
      }

      store.setUsed(collection, key);

      return retrieve(key);
    },
    get: (key: string) => {
      return retrieve(key);
    },
    clear: () => {
      store.resetUsage(collection);
    },
  };
}

function referenceCollection(store: Store): StoreCollection {
  const collection = REFERENCE_COLLECTION;

  const retrieve = <T>(key: string): StateArray<T> => {
    if (store.exists(collection, key)) {
      const item = store.get(collection, key);

      return [item.value as T, () => undefined, () => undefined, []];
    }

    return [undefined as T, () => undefined, () => undefined, []];
  };

  return {
    items: {},
    used: [],
    set: ({ key, value }) => {
      const exists = store.exists(collection, key);

      if (exists) {
        throwError(`reference (${key}) already exists.`);
      }

      store.add(collection, key, value);
      store.setUsed(collection, key);

      return retrieve(key);
    },
    get: (key: string) => {
      return retrieve(key);
    },
    clear: () => {
      Object.keys(store.collections[collection].items).forEach((key) => {
        if (store.wasUsed(collection, key)) return;

        store.remove(collection, key);
      });

      store.resetUsage(collection);
    },
  };
}
