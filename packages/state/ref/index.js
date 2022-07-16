import { RecursiveState } from "../index";

/**
 * Create a new reference store.
 * @param {RecursiveState} store
 */
const CreateRefStore = (store) => {
    const storeName = "ref";

    function retrieve(key, defaultValue) {
        if (store.itemExists(key, storeName)) {
            return store.getItem(key, storeName).value;
        } else {
            store.getItem(key, storeName, defaultValue);
        }
    }

    function set(key, value, onInit, onRemoved) {
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

export default CreateRefStore;
