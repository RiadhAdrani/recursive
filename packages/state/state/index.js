import { RecursiveConsole } from "../../console";
import { retrieveStatefulObject } from "../utility";
import { STATE_STATE_STORE } from "../../constants";
/**
 * Create a new state store.
 * @param {import("..").RecursiveState} store */
export default (store) => {
  const storeName = STATE_STATE_STORE;

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
    for (let key in store.stores[storeName].items) {
      if (!store.itemIsUsed(storeName, key)) store.removeItem(key, storeName);
    }

    store.stores[storeName].used = [];
  }

  function flush() {}

  return { set, get, clear, flush, name: storeName };
};
