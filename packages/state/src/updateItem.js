import { RecursiveState } from "../";
import RecursiveConsole from "../../console";

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
    }

    if (stateManager.stores[store].items[key] === undefined) {
        RecursiveConsole.error("State does not exist in the current store.");
    }

    if (stateManager.stores[store].items[key].value !== newValue || forceUpdate) {
        stateManager.stores[store].items[key].history.push(
            stateManager.stores[store].items[key].value
        );
        stateManager.stores[store].items[key].preValue =
            stateManager.stores[store].items[key].value;

        stateManager.stores[store].items[key].value = newValue;

        if (onChanged && typeof onChanged === "function") (() => onChanged())();
    }
}

export default updateItem;
