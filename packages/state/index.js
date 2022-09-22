const { copy } = require("../common");

const CreateCacheStore = require("./cache");
const CreateReservedStore = require("./reserved");
const CreateRefStore = require("./ref");
const CreateStateStore = require("./state");

const removeItem = require("./src/removeItem");
const updateItem = require("./src/updateItem");
const {
    STATE_STATE_STORE,
    STATE_CACHE_STORE,
    STATE_RESERVED_STORE,
    STATE_REF_STORE,
    STATE_EFFECT_STORE,
} = require("../constants");
const CreateEffectStore = require("./effect");
const { RecursiveConsole } = require("../console");

class RecursiveState {
    constructor(bootstrapper) {
        this.stores = {};
        this.history = [copy(this.stores)];
        this.bootstrapper = bootstrapper;
        this.cacheSize = 1000;

        this.createStore(CreateStateStore(this));
        this.createStore(CreateReservedStore(this));
        this.createStore(CreateCacheStore(this));
        this.createStore(CreateRefStore(this));
        this.createStore(CreateEffectStore(this));
    }

    get orchestrator() {
        return this.bootstrapper.orchestrator;
    }

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

    itemExists(key, store) {
        if (
            !this.stores.hasOwnProperty(store) ||
            !this.stores[store].hasOwnProperty("items") ||
            !this.stores[store].items.hasOwnProperty(key)
        )
            return false;

        return true;
    }

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

    removeItem(key, store) {
        removeItem(key, store, this);
    }

    updateItem(key, newValue, store, onChanged, forceUpdate) {
        updateItem(key, newValue, store, onChanged, forceUpdate, this);
    }

    clear() {
        this.history.push(copy(this.stores));

        for (let store in this.stores) {
            if (typeof this.stores[store].clear === "function") this.stores[store].clear();
        }
    }

    flush() {}

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

    useBatchCallback(callback, batchName) {
        if (this.orchestrator) {
            this.orchestrator.batchCallback(callback, batchName);
        }
    }

    setItemUsed(storeName, key) {
        if (!this.stores[storeName]) return;

        this.stores[storeName].used.push(key);
    }

    itemIsUsed(storeName, key) {
        return this.stores[storeName].used.includes(key);
    }

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

    getState(key) {
        return this.stores[STATE_STATE_STORE].get(key);
    }

    setState(key, value, onInit, onRemoved) {
        return this.stores[STATE_STATE_STORE].set(key, value, onInit, onRemoved);
    }

    getCache(key) {
        return this.stores[STATE_CACHE_STORE].get(key);
    }

    setCache(key, value, onInit, onRemoved) {
        return this.stores[STATE_CACHE_STORE].set(key, value, onInit, onRemoved);
    }

    setReserved(key, value) {
        return this.stores[STATE_RESERVED_STORE].set(key, value);
    }

    getReserved(key) {
        return this.stores[STATE_RESERVED_STORE].get(key);
    }

    setRef(key, value) {
        return this.stores[STATE_REF_STORE].set(key, value);
    }

    getRef(key, defaultValue) {
        return this.stores[STATE_REF_STORE].get(key, defaultValue);
    }

    setEffect(key, callback, dependencies) {
        this.stores[STATE_EFFECT_STORE].set(key, callback, dependencies);
    }
}

module.exports = { RecursiveState };
