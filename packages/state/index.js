const { copy } = require("../common");

const CreateCacheStore = require("./cache");
const CreateReservedStore = require("./reserved");
const CreateRefStore = require("./ref");
const CreateStateStore = require("./state");

const addItem = require("./src/addItem");
const clear = require("./src/clear");
const createStore = require("./src/createStore");
const getItem = require("./src/getItem");
const itemExists = require("./src/itemExists");
const removeItem = require("./src/removeItem");
const updateItem = require("./src/updateItem");
const {
    STATE_STATE_STORE,
    STATE_CACHE_STORE,
    STATE_RESERVED_STORE,
    STATE_REF_STORE,
    STATE_EFFECT_STORE,
} = require("../constants");
const { RecursiveOrchestrator } = require("../orchestrator");
const CreateEffectStore = require("./effect");

/**
 * Store and manage app state.
 *
 * * `state` reactive object that will last as long as it is needed.
 * * `cache` reactive state that will last as long as the App is running.
 * * `ref` reference an element in the App tree.
 * * `reserved`  used internally by some modules.
 * * `effect` launch side effects.
 */
class RecursiveState {
    constructor() {
        /**
         * @type {import("../../lib").StateStores}
         */
        this.stores = {};

        this.history = [this.copy(this.stores)];

        /**
         * @type {RecursiveOrchestrator}
         */
        this.orchestrator = undefined;

        this.cacheSize = 1000;

        this.createStore(CreateStateStore(this));
        this.createStore(CreateReservedStore(this));
        this.createStore(CreateCacheStore(this));
        this.createStore(CreateRefStore(this));
        this.createStore(CreateEffectStore(this));
    }

    /**
     * Create a new stateful object within the store.
     * @param {String} key
     * @param {any} value
     * @param {String} store
     * @param {Function} onAdded
     * @param {Function} onRemoved
     */
    addItem(key, value = undefined, store, onAdded, onRemoved) {
        addItem(key, value, store, onAdded, onRemoved, this);
    }

    /**
     * Check if an item exists in the store.
     * @param {String} key
     * @param {String} store
     * @returns {boolean}
     */
    itemExists(key, store) {
        return itemExists(key, store, this);
    }

    /**
     * Create a new instance of the given object.
     * @param {any} from
     * @returns
     */
    copy(from) {
        return copy(from);
    }

    /**
     * Retrieve the item with located in the given store by its `key`.
     * @param {String} key
     * @param {String} store
     * @param {any} defaultValue
     * @returns
     */
    getItem(key, store, defaultValue = undefined) {
        return getItem(key, store, defaultValue, this);
    }

    /**
     * Remove item from the store.
     * @param {String} key
     * @param {String} store
     */
    removeItem(key, store) {
        removeItem(key, store, this);
    }

    /**
     * Update a given item within the provided store.
     * @param {String} key
     * @param {any} newValue
     * @param {String} store
     * @param {Function} onChanged
     * @param {boolean} forceUpdate
     */
    updateItem(key, newValue, store, onChanged, forceUpdate) {
        updateItem(key, newValue, store, onChanged, forceUpdate, this);
    }

    /**
     * Clear out of scope and unused states.
     */
    clear() {
        clear(this);
    }

    /**
     * @unused
     */
    flush() {}

    /**
     * Create a new store.
     * @param {import("../../lib").StoreParams} params
     */
    createStore(params) {
        createStore(params, this);
    }

    /**
     * Call for an update to be scheduled,
     * after executing the given callback.
     */
    useBatchCallback(callback, batchName) {
        if (this.orchestrator) {
            this.orchestrator.batchCallback(callback, batchName);
        }
    }

    /**
     * Set the item as used in the current rendering iteration.
     * @param {String} storeName
     * @param {String} key
     * @returns
     */
    setItemUsed(storeName, key) {
        if (!this.stores[storeName]) return;

        this.stores[storeName].used.push(key);
    }

    /**
     * Check if the given item was used in the current rendering iteration.
     * @param {String} storeName
     * @param {String} key
     * @returns
     */
    itemIsUsed(storeName, key) {
        return this.stores[storeName].used.includes(key);
    }

    /**
     * Execute unsubscription callback for a given item in a given store.
     * @param {string} key object key
     * @param {string} storeName store identifier
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
     * Retrieve an existing stateful object from the `state` store if it exists.
     * @param {string} key identifier
     * @throw an error if the state does not exist.
     * @returns {import("../../lib").StateArray} StateArray
     */
    getState(key) {
        return this.stores[STATE_STATE_STORE].get(key);
    }

    /**
     * Create and save a stateful object in the `state` store within the global `StateStore`.
     *
     * Objects created by this method are deleted when they are not used or called in a rendering iteration.
     * @param {string} key unique identifier of the state whithin its store.
     * @param {any} value initial value
     * @param {Function} onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param {Function} onRemoved a function that will execute when the state has been destroyed.
     * @returns {import("../../lib").StateArray} StateArray
     */
    setState(key, value, onInit, onRemoved) {
        return this.stores[STATE_STATE_STORE].set(key, value, onInit, onRemoved);
    }

    /**
     * Retrieve an existing stateful object from the `cache` store if it exists.
     * @param {string} key identifier
     * @throw an error if the state does not exist.
     * @returns {import("../../lib").StateArray} StateArray
     */
    getCache(key) {
        return this.stores[STATE_CACHE_STORE].get(key);
    }

    /**
     * Create and save a stateful object in the `cache` store within the global `StateStore`.
     *
     * Objects created by this method are not deleted when they are not used,
     * unless the number of cached object exceed the maximum allocated size which is by default `1000`.
     *
     * Older states will be deleted first.
     *
     * @param {string} key unique identifier of the state whithin its store.
     * @param {any} value initial value
     * @param {Function} onInit a function that will execute when the state is initialized.
     * If the return value of this function is a function itself,
     * it will be executed whe the state is destroyed.
     * @param {Function} onRemoved a function that will execute when the state has been destroyed.
     * @returns {import("../../lib").StateArray} StateArray
     */
    setCache(key, value, onInit, onRemoved) {
        return this.stores[STATE_CACHE_STORE].set(key, value, onInit, onRemoved);
    }

    /**
     * Create a reserved item for the app.
     * @param {String} key
     * @param {any} value
     * @returns {import("../../lib").StateArray} StateArray
     */
    setReserved(key, value) {
        return this.stores[STATE_RESERVED_STORE].set(key, value);
    }

    /**
     * Retrieve the reserved item if it exists.
     * @param {String} key
     * @returns {import("../../lib").StateArray} StateArray
     */
    getReserved(key) {
        return this.stores[STATE_RESERVED_STORE].get(key);
    }

    /**
     * Set reference for a UI element.
     * @param {String} key
     * @param {any} value
     * @returns
     */
    setRef(key, value) {
        return this.stores[STATE_REF_STORE].set(key, value);
    }

    /**
     * Retrieve an existing element from the `reference` store, or the default value.
     * @param {string} key identifier
     * @returns {any} element
     */
    getRef(key, defaultValue) {
        return this.stores[STATE_REF_STORE].get(key, defaultValue);
    }

    /**
     * Create and execute a new effect.
     * @param {string} key identifier.
     * @param {Function} callback callback to be executed.
     * @param {Array<>} dependencies effect dependencies that will decide if the effect should be called again.
     */
    setEffect(key, callback, dependencies) {
        this.stores[STATE_EFFECT_STORE].set(key, callback, dependencies);
    }
}

module.exports = { RecursiveState };
