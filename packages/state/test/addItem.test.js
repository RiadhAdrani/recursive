import { RecursiveState } from "..";
import { STATE_STATE_STORE } from "../../constants";

describe("RecursiveState.addItem", () => {
  let stateManager = new RecursiveState();

  beforeEach(() => {
    stateManager = new RecursiveState();
  });

  const storeName = STATE_STATE_STORE;

  it("should add an item to a valid store", () => {
    stateManager.addItem("test", "test", storeName, 0, 0);

    expect(Object.keys(stateManager.stores[storeName].items).length).toBe(1);
  });

  it.each([[undefined], [null], [""], [" "]])("should reject invalid key = %s", (key) => {
    stateManager.addItem(key, "test", storeName, 0, 0);

    expect(Object.keys(stateManager.stores[storeName].items).length).toBe(0);
  });

  it.each([
    [null, 0],
    [undefined, 0],
    ["", 0],
    ["anything", 1],
  ])("should not add item in the wrong store", (key, result) => {
    stateManager.addItem(key, "test", storeName, 0, 0);

    const sum = Object.keys(stateManager.stores).reduce((acc, store) => {
      return acc + Object.keys(stateManager.stores[store].items).length;
    }, 0);

    expect(sum).toBe(result);
  });
});
