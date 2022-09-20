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
const CreateEffectStore = require("./effect");

class RecursiveState {
    constructor(bootstrapper) {
        this.stores = {};
        this.history = [this.copy(this.stores)];
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
