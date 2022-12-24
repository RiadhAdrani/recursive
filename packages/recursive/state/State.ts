import { getItemAsArray, RecursiveStateManager, Store, StoreType } from ".";
import { RError } from "../console";

export default (manager: RecursiveStateManager): Store => {
  const store = StoreType.STATE;

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
