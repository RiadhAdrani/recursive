const { RecursiveConsole } = require("../../console");
const { RecursiveState } = require("..");

/**
 * Add a stateful object in the `store` within the global repository `stateManager`.
 * @param {string} key
 * @param {any} value
 * @param {string} store
 * @param {Function} onAdded
 * @param {Function} onRemoved
 * @param {RecursiveState} stateManager
 */
function addItem(key, value = undefined, store, onAdded, onRemoved, stateManager) {
    if (typeof key != "string") {
        RecursiveConsole.error("State UID is not of type string.");
        return;
    }

    if ([undefined, null, ""].includes(key.trim())) {
        RecursiveConsole.error("State UID cannot be one of these : '' or 'undefined' or 'null'.");
        return;
    }

    if (stateManager.stores[store] === undefined) {
        RecursiveConsole.error("Invalid store name.");
        return;
    }

    const _object = {
        value,
        preValue: undefined,
        history: [value],
        onRemoved,
        unsubscribe: () => {},
        addOrder: Object.keys(stateManager.stores[store].items).length,
    };

    stateManager.stores[store].items[key] = _object;

    if (onAdded && typeof onAdded === "function")
        (async () => {
            const unsubscribe = await onAdded();

            if (typeof unsubscribe === "function" && stateManager.itemExists(key, store)) {
                stateManager.stores[store].items[key].unsubscribe = unsubscribe;
            }
        })();
}

module.exports = addItem;
