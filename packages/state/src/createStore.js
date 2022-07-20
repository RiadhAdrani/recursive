const { RecursiveState } = require("..");
const { RecursiveConsole } = require("../../console");

/**
 * Add an create a new store to the `stateManager`.
 * @param {import("../../../lib").StoreParams} params
 * @param {RecursiveState} stateManager
 */
function createStore(params, stateManager) {
    const name = params.name;
    const set = params.set;
    const get = params.get;
    const flush = params.flush;
    const obj = params.obj;
    const clear = params.clear;

    if (typeof name !== "string") {
        RecursiveConsole.error(`name is not a string`);
        return;
    }

    if (!name.trim()) {
        RecursiveConsole.error(`name is not valid`);
        return;
    }

    if (typeof set !== "function") {
        RecursiveConsole.error("set is not a function");
        return;
    }

    if (typeof get !== "function") {
        RecursiveConsole.error("get is not a function");
        return;
    }

    if (typeof clear !== "function") {
        RecursiveConsole.error("clear is not a function");
        return;
    }

    if (typeof flush !== "function") {
        RecursiveConsole.error("flush is not a function");
        return;
    }

    const _name = name.trim();

    if (stateManager.stores[_name]) {
        RecursiveConsole.error("store already exists");
        return;
    }

    stateManager.stores[_name] = {
        items: {},
        used: [],
        obj,
        set,
        get,
        clear,
        flush,
    };
}

module.exports = createStore;
