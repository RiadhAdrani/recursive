const { RecursiveState } = require("..");
const { copy } = require("../../common");

/**
 * Common a stateful object from the store.
 * Used for sotres: `state`, `cache` and `reserved`.
 * @param {RecursiveState} store
 * @param {string} storeName
 * @param {string} key
 * @returns {import("../../../lib").StateArray}
 */
function retrieveStatefulObject(store, storeName, key) {
    const state = store.getItem(key, storeName);

    /**
     * A new value instance.
     */
    const _value = copy(state.value);

    /**
     * A new previous value instance.
     */
    const _preValue = copy(state.preValue);

    /**
     * Update the value of the state.
     * @param {any} newValue
     */
    const _set = function (newValue) {
        if (!store.itemExists(key, storeName)) return;

        store.updateItem(key, newValue, storeName, () => {
            store.useBatchCallback(() => {
                store.orchestrator.notifyStateChanged();
            }, storeName + Date.now());
        });
    };

    /**
     * Get the current value of the state.
     * @returns {any} value
     */
    const _live = function () {
        if (store.itemExists(key, storeName))
            return copy(store.getItem(key, storeName, undefined).value);
        else return undefined;
    };

    /**
     * Reset the state to the initial value.
     */
    const _reset = function () {
        if (!store.itemExists(key, storeName)) return;

        const newValue = copy(state.history[0]);

        store.updateItem(key, newValue, storeName, () => {
            store.useBatchCallback(() => {
                store.orchestrator.notifyStateChanged();
            }, storeName + Date.now());
        });
    };

    return [_value, _set, _live, _reset, _preValue];
}

module.exports = { retrieveStatefulObject };
