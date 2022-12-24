import { getItemAsArray, RecursiveStateManager, Store, StoreType } from ".";
import { RError } from "../console";

export default (manager: RecursiveStateManager): Store => {
  const store = StoreType.CACHE;

  return {
    set: (key, value, onCreated) => {
      const first = !manager.exists(store, key);

      if (first) {
        manager.add(store, key, value, onCreated);
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
      const length = Object.keys(manager.stores[store].items).length;

      if (length <= manager.cacheSize) {
        return;
      }

      Object.keys(manager.stores[store].items).forEach((key) => {
        const shouldBeRemoved = manager.get(store, key).order < length - manager.cacheSize;

        if (shouldBeRemoved) {
          manager.remove(store, key);
        }
      });

      manager.stores[store].used = [];
    },
    items: {},
    used: [],
  };
};
