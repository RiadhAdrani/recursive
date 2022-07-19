const { RecursiveState } = require("..");
const { RecursiveConsole } = require("../../console");
const { STATE_STATE_STORE } = require("../../constants");
const { retrieveStatefulObject } = require("../common");

/**
 * Create a new state store.
 * @param {RecursiveState} store
 */
const CreateStateStore = (store) => {
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

module.exports = CreateStateStore;
