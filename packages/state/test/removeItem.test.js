const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");
const addItem = require("../src/addItem");
const removeItem = require("../src/removeItem");

describe("RecursiveState.itemExists", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    it("should remove item", () => {
        const name = STATE_STATE_STORE;
        const key = "key";

        addItem(key, "lorem", name, 0, 0, StateManager);

        removeItem(key, name, StateManager);

        expect(StateManager.stores[STATE_STATE_STORE].items[key]).toBeFalsy();
    });
});
