import { ItemArray, RecursiveStateManager, Store, StoreType } from ".";
import { RError } from "../console";

export default (manager: RecursiveStateManager): Store => {
  const store = StoreType.REFERENCE;

  return {
    set: <T>(key: string, value: T) => {
      if (manager.isUsed(store, key)) {
        throw new Error(`Reference (${key}) already defined.`);
      }

      manager.add(store, key, value);
      manager.setUsed(store, key);

      return [undefined, () => undefined, () => undefined] as unknown as ItemArray<T>;
    },
    get: <T>(key: string) => {
      if (!manager.exists(store, key)) {
        throw new RError("Invalid Store/Key");
      }

      const item = manager.get<T>(store, key);

      return [item.value, () => undefined, () => undefined] as unknown as ItemArray<T>;
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
