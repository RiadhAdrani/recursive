const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");
const addItem = require("../src/addItem");
const getItem = require("../src/getItem");

describe("RecursiveState.getItem", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    it.each([[STATE_STATE_STORE, "value_key", "value"]])(
        "should get the correct value",
        (name, key, value) => {
            expect(
                (() => {
                    addItem(key, value, name, 0, 0, StateManager);

                    return getItem(key, name, undefined, StateManager).value;
                })()
            ).toBe(value);
        }
    );

    it.each([
        [undefined, "value_key", "value"],
        [null, "value_key", "value"],
        ["", "value_key", "value"],
        [STATE_STATE_STORE, undefined, "value"],
        [STATE_STATE_STORE, null, "value"],
        [STATE_STATE_STORE, "", "value"],
    ])("should be falsy value", (name, key, value) => {
        expect(
            (() => {
                addItem(key, value, name, 0, 0, StateManager);

                return getItem(key, name, undefined, StateManager);
            })()
        ).toBeFalsy();
    });
});
