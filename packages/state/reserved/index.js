const { RecursiveConsole } = require("../../console");
const { retrieveStatefulObject } = require("../utility");
const { STATE_RESERVED_STORE } = require("../../constants");

/**
 * Create a new reserved state store.
 * @param {import("..").RecursiveState} store
 */
const reservedStore = (store) => {
    const storeName = STATE_RESERVED_STORE;

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

    function clear() {}

    function flush() {}

    return { set, get, clear, flush, name: storeName };
};

module.exports = reservedStore;
