const { RecursiveState } = require("..");
const { RecursiveConsole } = require("../../console");
const { STATE_EFFECT_STORE } = require("../../constants");

/**
 * Create a new effect store.
 * @param {RecursiveState} store
 */
const CreateEffectStore = (store) => {
    const storeName = STATE_EFFECT_STORE;

    function runEffect(callback) {
        if (typeof callback === "function") {
            const maybeCleanUpCallback = callback();

            if (typeof maybeCleanUpCallback === "function") {
                return maybeCleanUpCallback;
            }
        }

        return () => {};
    }

    function set(key, callback, dependencies) {
        const isFirstTime = !store.itemExists(key, storeName);

        if (typeof callback !== "function") {
            RecursiveConsole.error("Recursive State : Effect callback is not a function.");
        }

        const value = Array.isArray(dependencies) ? dependencies : [];

        let cleanCallback = () => {};

        if (isFirstTime) {
            // We run the effect for the first time
            cleanCallback = runEffect(callback);
        } else {
            const old = store.getItem(key, storeName);

            if (store.itemIsUsed(storeName, key)) {
                RecursiveConsole.error("Recursive State : Duplicate effect detected.", [
                    "You are using an effect twice in your tree, which is forbidden.",
                    "Try changing the keys of the effects to be unique or merge them into a single effect.",
                ]);
            }

            if (JSON.stringify(value) !== JSON.stringify(old.value)) {
                // Dependencies have changed,
                // we run the unsubscribe function before executing the new one
                store.runUnsubscriptionCallback(key, storeName);

                cleanCallback = runEffect(callback);
            }
        }

        store.addItem(key, value, storeName, () => cleanCallback);
        store.setItemUsed(storeName, key);
    }

    function clear() {
        for (let key in store.stores[storeName].items) {
            if (!store.itemIsUsed(storeName, key)) {
                // Run effect unsubscription before remove the object.
                store.runUnsubscriptionCallback(key, storeName);
                store.removeItem(key, storeName);
            }
        }

        store.stores[storeName].used = [];
    }

    function get() {}

    function flush() {}

    return { set, get, clear, flush, name: storeName };
};

module.exports = CreateEffectStore;
