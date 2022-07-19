import { RecursiveState } from ".";

/**
 *
 * @param {RecursiveState} store
 * @param {string} storeName
 * @param {string} key
 * @returns {import("../../lib").StateArray}
 */
function retrieveStatefulObject(store, storeName, key) {
    const state = store.getItem(key, storeName);

    const _value = store.copy(state.value);

    const _preValue = store.copy(state.preValue);

    const _set = function (newValue) {
        if (!store.itemExists(key, storeName)) return;

        store.updateItem(key, newValue, storeName, () => {
            store.useBatchCallback(() => {
                store.orchestrator.notifyStateChanged();
            }, storeName + Date.now());
        });
    };

    const _live = function () {
        if (store.itemExists(key, storeName))
            return store.copy(store.getItem(key, storeName, undefined).value);
        else return undefined;
    };

    const _reset = function () {
        if (!store.itemExists(key, storeName)) return;

        const newValue = state.history[0];

        store.updateItem(key, newValue, storeName, () => {
            store.useBatchCallback(() => {
                store.orchestrator.notifyStateChanged();
            }, storeName + Date.now());
        });
    };

    return [_value, _set, _live, _reset, _preValue];
}

export { retrieveStatefulObject };
