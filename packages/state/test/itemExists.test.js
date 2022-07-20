const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");
const addItem = require("../src/addItem");
const itemExists = require("../src/itemExists");

describe("RecursiveState.itemExists", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    it.each([
        [STATE_STATE_STORE, "value_key", "value_key", true],
        [null, "value_key", "value_key", false],
        [STATE_STATE_STORE, "value_key", "other_key", false],
    ])("should determine if an item exists", (name, key, searchKey, value) => {
        expect(
            (() => {
                addItem(key, "lorem", name, 0, 0, StateManager);

                return itemExists(searchKey, name, StateManager);
            })()
        ).toBe(value);
    });
});
