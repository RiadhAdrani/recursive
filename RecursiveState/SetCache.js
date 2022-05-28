import { throwError } from "@riadh-adrani/recursive/RecursiveDOM/RecursiveError.js";
import RecursiveOrchestrator from "@riadh-adrani/recursive/RecursiveOrchestrator/RecursiveOrchestrator.js";

class CacheStore {
    static singleton = new CacheStore();

    constructor() {
        this.items = {};
    }

    /**
     * Add the provided item to the `CacheStore` list.
     * @param {Cache} item cache object to store
     * @returns {Boolean} true if the operation succeded
     */
    addCache(item) {
        if (!item.uuid || !item instanceof Cache) return;

        this.items[item.uuid] = item;

        return true;
    }

    /**
     * Create a cache object. Available any where and every where after initialization.
     * @param {String} uuid the universal unique identifier of the cached data
     * @param {Any} value the initial value of the cached data
     * @param {Function} onInit an function that will execute when the cached has been successfully added to the store.
     * @returns {[Any, Function, Function, Function]} an array of data and functions
     */
    setCache(uuid, value, onInit) {
        let firstTime = false;

        if (!uuid) {
            throwError("Cache object does not have a valid uuid!", []);
        }

        if (!this.items[uuid]) {
            this.items[uuid] = new Cache({ uuid, value, onInit });
            firstTime = true;
        }

        const val = this.items[uuid].value;
        const set = (newVal) => {
            if (this.items[uuid]) this.items[uuid].setValue(newVal);
        };
        const setSilently = (newVal) => {
            if (this.items[uuid]) this.items[uuid].setValueSilently(newVal);
        };
        const live = () => this.items[uuid].value;

        if (typeof this.items[uuid].onInit === "function" && firstTime) {
            (() => this.items[uuid].onInit())();
        }

        return [val, set, setSilently, live];
    }

    getCache(uuid) {
        if (!this.items[uuid]) {
            throwError(`Cached object with the UID ${uuid} does not exist!`, [
                "You tried to access a non-existant cache.",
            ]);
        }

        const val = this.items[uuid].value;
        const set = (newVal) => {
            if (this.items[uuid]) this.items[uuid].setValue(newVal);
        };
        const setSilently = (newVal) => {
            if (this.items[uuid]) this.items[uuid].setValueSilently(newVal);
        };
        const live = () => this.items[uuid].value;

        return [val, set, setSilently, live];
    }
}

class Cache {
    constructor({ uuid, value, onInit }) {
        this.uuid = uuid;
        this.value = value;
        this.onInit = onInit;
        this.preValue = undefined;
    }

    setValueSilently(newVal) {
        this.preValue = this.value;
        this.value = newVal;
    }

    setValue(newVal) {
        const valueDidChange = this.value !== newVal;

        this.preValue = this.value;
        this.value = newVal;

        if (valueDidChange) {
            RecursiveOrchestrator.notifyStateChanged(this.uuid);

            if (RecursiveOrchestrator.isBatching() === false) {
                RecursiveOrchestrator.requestUpdate(this.uuid);
            }
        }
    }
}

function setCache(uuid, value, onInit) {
    return CacheStore.singleton.setCache(uuid, value, onInit);
}

function getCache(uuid) {
    return CacheStore.singleton.getCache(uuid);
}

export { setCache, getCache };
