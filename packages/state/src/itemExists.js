import { RecursiveState } from "..";

/**
 * Check if an element exists in the given `store`.
 * @param {string} key
 * @param {string} store
 * @param {RecursiveState} stateManager
 * @returns {boolean}
 */
function itemExists(key, store, stateManager) {
    if (
        stateManager.stores[store] === undefined ||
        stateManager.stores[store].items[key] === undefined
    )
        return false;

    return true;
}

export default itemExists;
