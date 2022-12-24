import { areEqual, isFunction } from "@riadh-adrani/utility-js";
import { EffectCallback, getItemAsArray, RecursiveStateManager, Store, StoreType } from ".";
import { RError } from "../console";

export default (manager: RecursiveStateManager): Store => {
  const store = StoreType.EFFECT;

  return {
    set: <T>(key: string, value: T, onCreated?: EffectCallback) => {
      const first = !manager.exists(store, key);

      if (!isFunction(onCreated)) {
        throw new RError(`Effect (${key}) callback is not a function.`);
      }

      if (first) {
        manager.add(store, key, value, onCreated);
      } else {
        const item = manager.get<Array<unknown>>(store, key);

        if (!areEqual(item.value, value)) {
          item.onRemoved?.();

          item.first = true;
          item.value = value as T[];
        }
      }

      manager.setUsed(store, key);
      return getItemAsArray(manager, store, key);
    },
    get: (key) => {
      if (!manager.exists(store, key)) {
        throw new RError("Invalid Store/Key");
      }

      return getItemAsArray(manager, store, key);
    },
    clear: () => {
      Object.keys(manager.stores[store].items).forEach((key) => {
        if (!manager.isUsed(store, key)) {
          manager.remove(store, key);
        }
      });

      manager.stores[store].used = [];
    },
    items: {},
    used: [],
  };
};
