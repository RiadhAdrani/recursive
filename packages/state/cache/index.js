import { RecursiveConsole } from "../../console";
import { retrieveStatefulObject } from "../utility";
import { STATE_CACHE_STORE } from "../../constants";

/**
 * Create a new cache store.
 * @param {import("..").RecursiveState} store
 */
export default (store) => {
  const storeName = STATE_CACHE_STORE;

  function retrieve(key) {
    return retrieveStatefulObject(store, storeName, key);
  }

  function set(key, value, onInit, onRemoved) {
    const first = !store.itemExists(key, storeName);

    if (first) {
      store.addItem(key, value, storeName, onInit, onRemoved);
    }

    store.setItemUsed(storeName, key);

    return retrieve(key);
  }

  function get(key) {
    if (!store.itemExists(key, storeName))
      RecursiveConsole.error("State with the uid " + key + " does not exists.");

    return retrieve(key);
  }

  function clear() {
    const items = store.stores[storeName].items;
    const length = Object.keys(items).length;

    if (length > store.cacheSize) {
      for (let key in items) {
        if (items[key].addOrder < length - store.cacheSize) store.removeItem(key, storeName);
      }

      store.stores[storeName].used = Object.keys(items);
    }
  }

  function flush() {}

  return { set, get, clear, flush, name: storeName };
};
