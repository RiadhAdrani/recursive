import { throwError } from "../error";

class RecursiveState {
    constructor() {
        this.stores = {};
        this.history = [this.stores];
        this.orchestrator = undefined;

        const manager = this;

        (() => {
            const store = "state";

            function retrieve(key) {
                const state = manager.getItem(key, store);

                const _value = state.value;
                const _preValue = state.preValue;
                const _set = (newValue) => {
                    if (!manager.itemExists(key, store)) {
                        return;
                    }

                    manager.updateItem(key, newValue, store, () => {
                        manager.orchestrator.batchCallback(() => {
                            manager.orchestrator.notifyStateChanged();
                        }, "set-state-" + Date.now());
                    });
                };
                const _live = () => {
                    return manager.itemExists(key, store)
                        ? manager.getItem(key, store, undefined).value
                        : undefined;
                };

                return [_value, _set, _live, _preValue];
            }

            this.createStore({
                name: store,
                set: (key, value, onInit, onRemoved) => {
                    const first = !manager.itemExists(key, store);

                    if (first) manager.addItem(key, value, store, onInit, onRemoved);

                    manager.stores[store].used.push(key);

                    return retrieve(key);
                },
                get: (key) => {
                    if (!manager.itemExists(key, store)) {
                        throwError("State with the uid " + key + " does not exists.");
                    }

                    return retrieve(key);
                },
                clear: () => {
                    for (let key in manager.stores[store].items) {
                        if (!manager.stores[store].used.includes(key)) {
                            manager.removeItem(key, store);
                        }
                    }

                    manager.stores[store].used = [];
                },
                flush: () => {},
            });
        })();

        (() => {
            const store = "cache";

            function retrieve(key) {
                const state = manager.getItem(key, store);

                const _value = state.value;
                const _preValue = state.preValue;
                const _set = (newValue) => {
                    if (!manager.itemExists(key, store)) {
                        return;
                    }

                    manager.updateItem(key, newValue, store, () => {
                        manager.orchestrator.batchCallback(() => {
                            manager.orchestrator.notifyStateChanged();
                        }, "set-cache-" + Date.now());
                    });
                };
                const _live = () => {
                    return manager.itemExists(key, store)
                        ? manager.getItem(key, store, undefined).value
                        : undefined;
                };

                return [_value, _set, _live, _preValue];
            }

            this.createStore({
                name: store,
                set: (key, value, onInit, onRemoved) => {
                    const first = !manager.itemExists(key, store);

                    if (first) manager.addItem(key, value, store, onInit, onRemoved);

                    return retrieve(key);
                },
                get: (key) => {
                    if (!manager.itemExists(key, store)) {
                        throwError("State with the uid " + key + " does not exists.");
                    }

                    return retrieve(key);
                },
                clear: () => {},
                flush: () => {},
            });
        })();

        (() => {
            const store = "reserved";

            function retrieve(key) {
                const state = manager.getItem(key, store);

                const _value = state.value;
                const _preValue = state.preValue;
                const _set = (newValue) => {
                    if (!manager.itemExists(key, store)) {
                        return;
                    }

                    manager.updateItem(key, newValue, store, () => {
                        manager.orchestrator.batchCallback(() => {
                            manager.orchestrator.notifyStateChanged();
                        }, "set-reserved-" + Date.now());
                    });
                };
                const _live = () => {
                    return manager.itemExists(key, store)
                        ? manager.getItem(key, store, undefined).value
                        : undefined;
                };

                return [_value, _set, _live, _preValue];
            }

            this.createStore({
                name: store,
                set: (key, value, onInit, onRemoved) => {
                    const first = !manager.itemExists(key, store);

                    if (first) manager.addItem(key, value, store, onInit, onRemoved);

                    return retrieve(key);
                },
                get: (key) => {
                    if (!manager.itemExists(key, store)) {
                        throwError("Reserved State with the uid " + key + " does not exists.");
                    }

                    return retrieve(key);
                },
                clear: () => {},
                flush: () => {},
            });
        })();

        (() => {
            const store = "ref";

            function retrieve(key, defaultValue) {
                if (manager.itemExists(key, store)) return manager.getItem(key, store).value;
                else return manager.getItem(key, store, defaultValue);
            }

            this.createStore({
                name: store,
                set: (key, value, onInit, onRemoved) => {
                    manager.addItem(key, value, store, onInit, onRemoved);

                    manager.stores[store].used.push(key);
                },
                get: (key, defaultValue) => {
                    return retrieve(key, defaultValue);
                },
                clear: () => {
                    for (let key in manager.stores[store].items) {
                        if (!manager.stores[store].used.includes(key)) {
                            manager.removeItem(key, store);
                        }
                    }

                    manager.stores[store].used = [];
                },
                flush: () => {},
            });
        })();
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
            history: [undefined],
            onRemoved,
        };

        this.stores[store].items[key] = _object;

        if (onAdded && typeof onAdded === "function") (() => onAdded())();
    }

    itemExists(key, store) {
        if (this.stores[store] === undefined || this.stores[store].items[key] === undefined)
            return false;

        return true;
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

        if (fn && typeof fn === "function") (() => fn())();

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
