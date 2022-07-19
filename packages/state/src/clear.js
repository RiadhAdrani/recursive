import { RecursiveState } from "..";
import { copy } from "../../common";

/**
 * Perform post-update cleaning and state preservation.
 * @param {RecursiveState} stateManager
 */
function clear(stateManager) {
    stateManager.history.push(copy(stateManager.stores));

    for (let store in stateManager.stores) {
        if (typeof stateManager.stores[store].clear === "function")
            stateManager.stores[store].clear();
    }
}

export default clear;
