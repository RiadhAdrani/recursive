const { RecursiveState } = require("..");
const { STATE_STATE_STORE } = require("../../constants");
const addItem = require("../src/addItem");

describe("RecursiveState.addItem", () => {
    let StateManager = new RecursiveState();

    beforeEach(() => {
        StateManager = new RecursiveState();
    });

    const storeName = STATE_STATE_STORE;

    it("should add an item to a valid store", () => {
        expect(
            (() => {
                addItem("test", "test", storeName, 0, 0, StateManager);

                return Object.keys(StateManager.stores[storeName].items).length;
            })()
        ).toBe(1);
    });

    it.each([
        [undefined, 0],
        [null, 0],
        ["", 0],
        [" ", 0],
    ])("should reject invalid key = %s", (key, result) => {
        expect(
            (() => {
                addItem(key, "test", storeName, 0, 0, StateManager);

                return Object.keys(StateManager.stores[storeName].items).length;
            })()
        ).toBe(result);
    });

    it.each([
        [null, 0],
        [undefined, 0],
        ["", 0],
        ["anything", 0],
    ])("should reject invalid key = %s", (key, result) => {
        expect(
            (() => {
                addItem("test", "test", key, 0, 0, StateManager);

                const sum = (() => {
                    let sum = 0;

                    for (let store in StateManager.stores) {
                        sum += Object.keys(StateManager.stores[store].items).length;
                    }

                    return sum;
                })();

                return sum;
            })()
        ).toBe(result);
    });
});
