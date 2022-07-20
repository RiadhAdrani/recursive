const { RecursiveState } = require("..");
const createStore = require("../src/createStore");

describe("RecursiveState.createStore", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    it.each([["storage"]])("should create store with valid input", (name) => {
        expect(
            (() => {
                createStore(
                    {
                        name,
                        clear: () => {},
                        flush: () => {},
                        get: () => {},
                        obj: {},
                        set: () => {},
                    },
                    StateManager
                );

                return Object.keys(StateManager.stores[name].items).length;
            })()
        ).toBeDefined();
    });

    it.each([
        [undefined, () => {}, () => {}, () => {}, () => {}],
        [null, () => {}, () => {}, () => {}, () => {}],
        ["", () => {}, () => {}, () => {}, () => {}],
        [" ", () => {}, () => {}, () => {}, () => {}],
        ["storage", null, () => {}, () => {}, () => {}],
        ["storage", () => {}, null, () => {}, () => {}],
        ["storage", () => {}, () => {}, null, () => {}],
        ["storage", () => {}, () => {}, () => {}, null],
    ])("should decline any invalid property", (name, clear, flush, get, set) => {
        expect(
            (() => {
                createStore(
                    {
                        name,
                        clear,
                        flush,
                        get,
                        obj: {},
                        set,
                    },
                    StateManager
                );

                return StateManager.stores[name];
            })()
        ).toBeFalsy();
    });
});
