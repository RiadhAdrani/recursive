const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");
const addItem = require("../src/addItem");
const getItem = require("../src/getItem");
const itemExists = require("../src/itemExists");
const updateItem = require("../src/updateItem");

describe("RecursiveState.itemExists", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    it.each([[STATE_STATE_STORE, "value_key"]])("should update the item correctly", (name, key) => {
        const newValue = "new_lorem";

        expect(
            (() => {
                addItem(key, "lorem", name, 0, 0, StateManager);

                updateItem(key, newValue, name, 0, 0, StateManager);

                return getItem(key, name, undefined, StateManager).value;
            })()
        ).toBe(newValue);
    });

    it.each([
        [STATE_STATE_STORE, "value_key", STATE_STATE_STORE, "falsy_key"],
        [STATE_STATE_STORE, "value_key", "falsy_store", "value_key"],
    ])("should not update the item", (name, key, upName, upKey) => {
        const value = "lorem";
        const newValue = "new_lorem";

        expect(
            (() => {
                addItem(key, value, name, 0, 0, StateManager);

                updateItem(upKey, newValue, upName, 0, 0, StateManager);

                return getItem(key, name, undefined, StateManager).value;
            })()
        ).toBe(value);
    });
});
