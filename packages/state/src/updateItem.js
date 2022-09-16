const { RecursiveState } = require("..");
const { RecursiveConsole } = require("../../console");
const itemExists = require("./itemExists");

/**
 * Update a state entry.
 * @param {string} key
 * @param {any} newValue
 * @param {string} store
 * @param {Function} onChanged
 * @param {boolean} forceUpdate
 * @param {RecursiveState} stateManager
 */
function updateItem(key, newValue, store, onChanged, forceUpdate, stateManager) {
    if (stateManager.stores[store] === undefined) {
        RecursiveConsole.error("Invalid store name.");
        return;
    }

    if (!itemExists(key, store, stateManager)) {
        RecursiveConsole.error("State does not exist in the current store.");
        return;
    }

    if (stateManager.stores[store].items[key].value !== newValue || forceUpdate) {
        stateManager.stores[store].items[key].history.push(
            stateManager.copy(stateManager.stores[store].items[key].value)
        );
        stateManager.stores[store].items[key].preValue =
            stateManager.stores[store].items[key].value;

        stateManager.stores[store].items[key].value = newValue;

        if (onChanged && typeof onChanged === "function") (() => onChanged())();
    }
}

module.exports = updateItem;
