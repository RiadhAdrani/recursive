const { RecursiveState } = require("..");
const {
    STATE_STATE_STORE,
    STATE_REF_STORE,
    STATE_CACHE_STORE,
    STATE_RESERVED_STORE,
} = require("../../constants");
const clear = require("../src/clear");

describe("RecursiveState.clear", () => {
    let stateManager = new RecursiveState();

    beforeEach(() => {
        stateManager = new RecursiveState();
    });

    it.each([
        [STATE_STATE_STORE, 0],
        [STATE_REF_STORE, 0],
        [STATE_CACHE_STORE, 1],
        [STATE_RESERVED_STORE, 1],
    ])("should correctly clear items of store = %s", (store, result) => {
        stateManager.addItem("test", "test", store, 0, 0, stateManager);

        clear(stateManager);

        const sum = Object.keys(stateManager.stores[store].items).length;

        expect(sum).toBe(result);
    });

    it("should remove the excess from the cache store", () => {
        for (let i = 0; i < 1500; i++) {
            stateManager.addItem("test" + i, "test", STATE_CACHE_STORE, 0, 0);
        }

        clear(stateManager);

        const sum = Object.keys(stateManager.stores[STATE_CACHE_STORE].items).length;

        expect(sum).toBe(1000);
    });
});
