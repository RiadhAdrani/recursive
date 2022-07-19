const { RecursiveState } = require("..");
const { RecursiveConsole } = require("../../console");

/**
 *
 * @param {string} key
 * @param {string} store
 * @param {any} defaultValue
 * @param {RecursiveState} stateManager
 * @returns {import("../../../lib").StateEntry}
 */
function getItem(key, store, defaultValue = undefined, stateManager) {
    if (stateManager.stores[store] === undefined) {
        RecursiveConsole.error("Invalid store name.");
    }

    if (stateManager.stores[store].items[key] === undefined) {
        return defaultValue;
    }

    return stateManager.stores[store].items[key];
}

module.exports = getItem;
