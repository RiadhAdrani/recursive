const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");

describe("RecursiveState.getItem", () => {
    let stateManager = new RecursiveState();

    beforeEach(() => {
        stateManager = new RecursiveState();
    });

    it.each([[STATE_STATE_STORE, "value_key", "value"]])(
        "should get the correct value",
        (name, key, value) => {
            stateManager.addItem(key, value, name, 0, 0);

            expect(stateManager.getItem(key, name, undefined, stateManager).value).toBe(value);
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
        stateManager.addItem(key, value, name, 0, 0);

        expect(stateManager.getItem(key, name, undefined, stateManager)).toBeFalsy();
    });
});
