import { throwError } from "../error";
import CreateCacheStore from "./cache";
import CreateRefStore from "./ref";
import CreateReservedStore from "./reserved";
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
        if ([undefined, null, ""].includes(key))
            throwError("State UID cannot be one of these : '' or 'undefined' or 'null' ");

        if (this.stores[store] === undefined) {
            throwError("Invalid store name.");
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
        if (this.stores[store] === undefined || this.stores[store].items[key] === undefined)
            return false;

        return true;
    }

    copy(from) {
        let output = undefined;

        if (
            ["bigint", "boolean", "function", "number", "string", "symbol", "undefined"].includes(
                typeof from
            ) ||
            from === null
        ) {
            output = from;
        } else if (Array.isArray(from)) {
            output = [];
            Object.assign(output, from);
        } else if (typeof from == "object") {
            output = {};
            Object.assign(output, from);
        } else {
            output = from;
        }

        return output;
    }

    getItem(key, store, defaultValue = undefined) {
        if (this.stores[store] === undefined) {
            throwError("Invalid store name.");
        }

        if (this.stores[store].items[key] === undefined) {
            return defaultValue;
        }

        return this.stores[store].items[key];
    }

    removeItem(key, store) {
        if (this.stores[store] === undefined) {
            throwError("Invalid store name.");
        }

        if (this.stores[store].items[key] === undefined) {
            throwError("State does not exist in the current store.");
        }

        const fn = this.stores[store].items[key].onRemoved;
        const unsub = this.stores[store].items[key].unsubscribe;

        (() => {
            if (typeof fn === "function") fn();
            unsub();
        })();

        delete this.stores[store].items[key];
    }

    updateItem(key, newValue, store, onChanged, forceUpdate) {
        if (this.stores[store] === undefined) {
            throwError("Invalid store name.");
        }

        if (this.stores[store].items[key] === undefined) {
            throwError("State does not exist in the current store.");
        }

        if (this.stores[store].items[key].value !== newValue || forceUpdate) {
            this.stores[store].items[key].history.push(this.stores[store].items[key].value);
            this.stores[store].items[key].preValue = this.stores[store].items[key].value;

            this.stores[store].items[key].value = newValue;

            if (onChanged && typeof onChanged === "function") (() => onChanged())();
        }
    }

    clear() {
        this.history.push(this.stores);

        for (let store in this.stores) {
            if (typeof this.stores[store].clear === "function") this.stores[store].clear();
        }
    }

    flush() {}

    createStore({ name, set, get, clear, flush, obj }) {
        if (typeof name !== "string") throwError(`name is not a string`);

        if (typeof set !== "function") throwError("set is not a function");

        if (typeof get !== "function") throwError("get is not a function");

        if (typeof clear !== "function") throwError("clear is not a function");

        if (typeof flush !== "function") throwError("flush is not a function");

        const _name = name.trim();

        if (this.stores[_name]) throwError("store already exists");

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
