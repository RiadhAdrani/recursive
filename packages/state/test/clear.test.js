const { RecursiveState } = require("..");
const {
    STATE_STATE_STORE,
    STATE_REF_STORE,
    STATE_CACHE_STORE,
    STATE_RESERVED_STORE,
} = require("../../constants");
const addItem = require("../src/addItem");
const clear = require("../src/clear");

describe("RecursiveState.clear", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    it.each([
        [STATE_STATE_STORE, 0],
        [STATE_REF_STORE, 0],
        [STATE_CACHE_STORE, 1],
        [STATE_RESERVED_STORE, 1],
    ])("should correctly clear items of store = %s", (store, result) => {
        expect(
            (() => {
                addItem("test", "test", store, 0, 0, StateManager);

                clear(StateManager);

                return Object.keys(StateManager.stores[store].items).length;
            })()
        ).toBe(result);
    });

    it("should remove the excess from the cache store", () => {
        expect(
            (() => {
                for (let i = 0; i < 1500; i++) {
                    addItem("test" + i, "test", STATE_CACHE_STORE, 0, 0, StateManager);
                }

                clear(StateManager);

                return Object.keys(StateManager.stores[STATE_CACHE_STORE].items).length;
            })()
        ).toBe(1000);
    });
});
