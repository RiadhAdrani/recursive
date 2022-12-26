import { RecursiveState } from "..";
import { STATE_STATE_STORE } from "../../constants";

describe("RecursiveState.itemExists", () => {
  let stateManager = new RecursiveState();

  beforeEach(() => {
    stateManager = new RecursiveState();
  });

  it.each([
    [STATE_STATE_STORE, "value_key", "value_key", true],
    [null, "value_key", "value_key", false],
    [STATE_STATE_STORE, "value_key", "other_key", false],
  ])("should determine if an item exists", (name, key, searchKey, value) => {
    stateManager.addItem(key, "lorem", name, 0, 0);

    expect(stateManager.itemExists(searchKey, name)).toBe(value);
  });
});
