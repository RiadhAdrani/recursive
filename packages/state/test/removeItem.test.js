const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");
const removeItem = require("../src/removeItem");

describe("RecursiveState.itemExists", () => {
    let stateManager = new RecursiveState();

    beforeEach(() => {
        stateManager = new RecursiveState();
    });

    it("should remove item", () => {
        const name = STATE_STATE_STORE;
        const key = "key";

        stateManager.addItem(key, "lorem", name, 0, 0);

        removeItem(key, name, stateManager);

        expect(stateManager.stores[STATE_STATE_STORE].items[key]).toBeFalsy();
    });
});
