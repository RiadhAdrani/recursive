const { copy, areEqual } = require("@riadh-adrani/utility-js");

const cacheStore = require("./cache");
const reservedStore = require("./reserved");
const refStore = require("./ref");
const stateStore = require("./state");
const effectStore = require("./effect");

const {
    STATE_STATE_STORE,
    STATE_CACHE_STORE,
    STATE_RESERVED_STORE,
    STATE_REF_STORE,
    STATE_EFFECT_STORE,
} = require("../constants");

const { RecursiveConsole } = require("../console");

class RecursiveState {
    constructor(bootstrapper) {
        /**
         * @type {Map<string,import(".").Store>}
         */
        this.stores = {};

        /**
         * @type {Array<Map<string,import(".").Store>>}
         */
        this.history = [copy(this.stores)];

        /**
         * @type {import("../app").RecursiveApp}
         */
        this.bootstrapper = bootstrapper;

        /**
         * @type {number}
         */
        this.cacheSize = 1000;

        this.createStore(stateStore(this));
        this.createStore(reservedStore(this));
        this.createStore(cacheStore(this));
        this.createStore(refStore(this));
        this.createStore(effectStore(this));
    }

    get orchestrator() {
        return this.bootstrapper.orchestrator;
    }

    /**
     * @param {string} key
     * @param {any} value
     * @param {string} store
     * @param {() => Function} onAdded
     * @param {() => void} onRemoved
     */
    addItem(key, value = undefined, store, onAdded, onRemoved) {
        if (typeof key != "string") {
            RecursiveConsole.error("Recursive State : State UID is not of type string.");
            return;
        }

        if ([undefined, null, ""].includes(key.trim())) {
            RecursiveConsole.error(
                "Recursive State : State UID cannot be one of these : '' or 'undefined' or 'null'."
            );
            return;
        }

        if (this.stores[store] === undefined) {
            RecursiveConsole.error("Recursive State : Invalid store name.");
            return;
        }

        const _object = {
            value,
            preValue: undefined,
            history: [value],
            onRemoved,
            unsubscribe: () => {},
            addOrder: Object.keys(this.stores[store].items).length,
        };

        this.stores[store].items[key] = _object;

        if (onAdded && typeof onAdded === "function")
            (async () => {
                const unsubscribe = await onAdded();

                if (typeof unsubscribe === "function" && this.itemExists(key, store)) {
                    this.stores[store].items[key].unsubscribe = unsubscribe;
                }
            })();
    }

    /**
     * @param {string} key
     * @param {string} store
     */
    itemExists(key, store) {
        if (
            !this.stores.hasOwnProperty(store) ||
            !this.stores[store].hasOwnProperty("items") ||
            !this.stores[store].items.hasOwnProperty(key)
        )
            return false;

        return true;
    }

    /**
     * @param {string} key
     * @param {string} store
     * @param {any} defaultValue
     * @returns {import(".").StoreItem<any>}
     */
    getItem(key, store, defaultValue = undefined) {
        if (this.stores[store] === undefined) {
            RecursiveConsole.error("Invalid store name.");
            return;
        }

        if (this.stores[store].items[key] === undefined) {
            return defaultValue;
        }

        return this.stores[store].items[key];
    }

    /**
     * @param {string} key
     * @param {string} store
     */
    removeItem(key, store) {
        if (this.stores[store] === undefined) {
            RecursiveConsole.error("Invalid store name.");
        }

        if (!this.itemExists(key, store)) {
            RecursiveConsole.error("State does not exist in the current store.");
        }

        const fn = this.stores[store].items[key].onRemoved;
        const unsub = this.stores[store].items[key].unsubscribe;

        (() => {
            if (typeof fn === "function") fn();
            unsub();
        })();

        delete this.stores[store].items[key];
    }

    /**
     * @param {string} key
     * @param {any} newValue
     * @param {string} store
     * @param {() => void} onChanged
     * @param {boolean} forceUpdate
     * @returns
     */
    updateItem(key, newValue, store, onChanged, forceUpdate) {
        if (this.stores[store] === undefined) {
            RecursiveConsole.error("Invalid store name.");
            return;
        }

        if (!this.itemExists(key, store)) {
            RecursiveConsole.error("State does not exist in the current store.");
            return;
        }

        if (!areEqual(this.stores[store].items[key].value, newValue) || forceUpdate) {
            this.stores[store].items[key].history.push(copy(this.stores[store].items[key].value));
            this.stores[store].items[key].preValue = this.stores[store].items[key].value;

            this.stores[store].items[key].value = newValue;

            if (onChanged && typeof onChanged === "function") (() => onChanged())();
        }
    }

    clear() {
        this.history.push(copy(this.stores));

        for (let store in this.stores) {
            if (typeof this.stores[store].clear === "function") this.stores[store].clear();
        }
    }

    flush() {}

    /**
     * @param {import(".").StoreParams} params
     * @returns {import(".").Store}
     */
    createStore(params) {
        const name = params.name;
        const set = params.set;
        const get = params.get;
        const flush = params.flush;
        const obj = params.obj;
        const clear = params.clear;

        if (typeof name !== "string") {
            RecursiveConsole.error(`name is not a string`);
            return;
        }

        if (!name.trim()) {
            RecursiveConsole.error(`name is not valid`);
            return;
        }

        if (typeof set !== "function") {
            RecursiveConsole.error("set is not a function");
            return;
        }

        if (typeof get !== "function") {
            RecursiveConsole.error("get is not a function");
            return;
        }

        if (typeof clear !== "function") {
            RecursiveConsole.error("clear is not a function");
            return;
        }

        if (typeof flush !== "function") {
            RecursiveConsole.error("flush is not a function");
            return;
        }

        const _name = name.trim();

        if (this.stores[_name]) {
            RecursiveConsole.error("store already exists");
            return;
        }

        this.stores[_name] = {
            items: {},
            used: [],
            obj,
            set,
            get,
            clear,
            flush,
        };
    }

    /**
     * @param {() => void} callback
     * @param {string} batchName
     */
    useBatchCallback(callback, batchName) {
        if (this.orchestrator) {
            this.orchestrator.batchCallback(callback, batchName);
        }
    }

    /**
     * @param {string} storeName
     * @param {string} key
     */
    setItemUsed(storeName, key) {
        if (!this.stores[storeName]) return;

        this.stores[storeName].used.push(key);
    }

    /**
     * @param {string} storeName
     * @param {string} key
     * @returns {boolean}
     */
    itemIsUsed(storeName, key) {
        return this.stores[storeName].used.includes(key);
    }

    /**
     * @param {string} key
     * @param {string} storeName
     */
    runUnsubscriptionCallback(key, storeName) {
        if (this.itemExists(key, storeName)) {
            const callback = this.getItem(key, storeName).unsubscribe;

            if (typeof callback === "function") {
                (() => {
                    callback();
                })();
            }
        }
    }

    /**
     * @param {string} key
     * @returns {import("../../lib").StateArray}
     */
    getState(key) {
        return this.stores[STATE_STATE_STORE].get(key);
    }

    /**
     * @param {string} key
     * @param {any} value
     * @param {() => Function} onInit
     * @param {() => void} onRemoved
     * @returns {import("../../lib").StateArray}
     */
    setState(key, value, onInit, onRemoved) {
        return this.stores[STATE_STATE_STORE].set(key, value, onInit, onRemoved);
    }

    /**
     * @param {string} key
     * @returns {import("../../lib").StateArray}
     */
    getCache(key) {
        return this.stores[STATE_CACHE_STORE].get(key);
    }

    /**
     * @param {string} key
     * @param {any} value
     * @param {() => Function} onInit
     * @param {() => void} onRemoved
     * @returns {import("../../lib").StateArray}
     */
    setCache(key, value, onInit, onRemoved) {
        return this.stores[STATE_CACHE_STORE].set(key, value, onInit, onRemoved);
    }

    /**
     * @param {string} key
     * @param {any} value
     * @returns {import("../../lib").StateArray}
     */
    setReserved(key, value) {
        return this.stores[STATE_RESERVED_STORE].set(key, value);
    }

    /**
     * @param {string} key
     * @returns {import("../../lib").StateArray}
     */
    getReserved(key) {
        return this.stores[STATE_RESERVED_STORE].get(key);
    }

    /**
     * @param {string} key
     * @param {import("../../lib").NativeElement} value
     * @returns {import("../../lib").NativeElement}
     */
    setRef(key, value) {
        return this.stores[STATE_REF_STORE].set(key, value);
    }

    /**
     * @param {string} key
     * @param {any} defaultValue
     * @returns {import("../../lib").NativeElement}
     */
    getRef(key, defaultValue) {
        return this.stores[STATE_REF_STORE].get(key, defaultValue);
    }

    /**
     * @param {string} key
     * @param {() => Function} callback
     * @param {Array<string>} dependencies
     */
    setEffect(key, callback, dependencies) {
        this.stores[STATE_EFFECT_STORE].set(key, callback, dependencies);
    }
}

module.exports = { RecursiveState };
