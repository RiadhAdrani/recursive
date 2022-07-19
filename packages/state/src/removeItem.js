import { RecursiveState } from "..";
import RecursiveConsole from "../../console";

/**
 * Remove the item with the key from the store.
 * @param {string} key
 * @param {string} store
 * @param {RecursiveState} stateManager
 */
function removeItem(key, store, stateManager) {
    if (stateManager.stores[store] === undefined) {
        RecursiveConsole.error("Invalid store name.");
    }

    if (stateManager.stores[store].items[key] === undefined) {
        RecursiveConsole.error("State does not exist in the current store.");
    }

    const fn = stateManager.stores[store].items[key].onRemoved;
    const unsub = stateManager.stores[store].items[key].unsubscribe;

    (() => {
        if (typeof fn === "function") fn();
        unsub();
    })();

    delete stateManager.stores[store].items[key];
}

export default removeItem;
