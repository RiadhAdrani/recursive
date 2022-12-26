import { RecursiveConsole } from "../../console";
import { STATE_REF_STORE } from "../../constants";
/**
 * Create a new reference store.
 * @param {import("..").RecursiveState} store
 */
export default (store) => {
  const storeName = STATE_REF_STORE;

  function retrieve(key, defaultValue) {
    if (store.itemExists(key, storeName)) {
      return store.getItem(key, storeName).value;
    } else {
      return store.getItem(key, storeName, defaultValue);
    }
  }

  function set(key, value, onInit, onRemoved) {
    if (store.itemIsUsed(storeName, key)) {
      RecursiveConsole.error(`Recursive State : reference key "${key}" has already been used.`);
      return;
    }

    store.addItem(key, value, storeName, onInit, onRemoved);
    store.setItemUsed(storeName, key);
  }

  function get(key, defaultValue) {
    return retrieve(key, defaultValue);
  }

  function clear() {
    for (let key in store.stores[storeName].items) {
      if (!store.itemIsUsed(storeName, key)) store.removeItem(key, storeName);
    }

    store.stores[storeName].used = [];
  }

  function flush() {}

  return { set, get, clear, flush, name: storeName };
};
