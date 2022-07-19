import { copy } from "../common";
import CreateCacheStore from "./cache";
import CreateRefStore from "./ref";
import CreateReservedStore from "./reserved";
import addItem from "./src/addItem";
import clear from "./src/clear";
import createStore from "./src/createStore";
import getItem from "./src/getItem";
import itemExists from "./src/itemExists";
import removeItem from "./src/removeItem";
import updateItem from "./src/updateItem";
import CreateStateStore from "./state";

/**
 * #### `RecursiveState`
 *
 * Store and manage different types of states.
 *
 * * `state` reactive object that will last as long as it is needed.
 * * `cache` reactive state that will last as long as the App is running.
 * * `ref` reference an element in the App tree.
 * * `reserved`  used internally by some modules.
 */
class RecursiveState {
    constructor() {
        /**
         * @type {import("../../lib").StateStores}
         */
        this.stores = {};

        this.history = [this.stores];

        this.orchestrator = undefined;

        this.cacheSize = 1000;

        this.createStore(CreateStateStore(this));
        this.createStore(CreateReservedStore(this));
        this.createStore(CreateCacheStore(this));
        this.createStore(CreateRefStore(this));
    }

    addItem(key, value = undefined, store, onAdded, onRemoved) {
        addItem(key, value, store, onAdded, onRemoved, this);
    }

    itemExists(key, store) {
        return itemExists(key, store, this);
    }

    copy(from) {
        return copy(from);
    }

    getItem(key, store, defaultValue = undefined) {
        return getItem(key, store, defaultValue, this);
    }

    removeItem(key, store) {
        removeItem(key, store, this);
    }

    updateItem(key, newValue, store, onChanged, forceUpdate) {
        updateItem(key, newValue, store, onChanged, forceUpdate, this);
    }

    clear() {
        clear(this);
    }

    flush() {}

    createStore(params) {
        createStore(params, this);
    }

    useBatchCallback(callback, batchName) {
        this.orchestrator.batchCallback(callback, batchName);
    }

    setItemUsed(storeName, key) {
        if (!this.stores[storeName]) return;

        this.stores[storeName].used.push(key);
    }

    itemIsUsed(storeName, key) {
        return this.stores[storeName].used.includes(key);
    }

    getState(key) {
        return this.stores.state.get(key);
    }

    setState(key, value, onInit, onRemoved) {
        return this.stores.state.set(key, value, onInit, onRemoved);
    }

    getCache(key) {
        return this.stores.cache.get(key);
    }

    setCache(key, value, onInit, onRemoved) {
        return this.stores.cache.set(key, value, onInit, onRemoved);
    }

    setReserved(key, value) {
        return this.stores.reserved.set(key, value);
    }

    getReserved(key) {
        return this.stores.reserved.get(key);
    }

    setRef(key, value) {
        return this.stores.ref.set(key, value);
    }

    getRef(key, defaultValue) {
        return this.stores.ref.get(key, defaultValue);
    }
}

export { RecursiveState };
