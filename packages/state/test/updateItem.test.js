import { RecursiveState } from "..";
import { STATE_STATE_STORE } from "../../constants";

describe("RecursiveState.itemExists", () => {
  let stateManager = new RecursiveState();

  beforeEach(() => {
    stateManager = new RecursiveState();
  });

  it.each([[STATE_STATE_STORE, "value_key"]])("should update the item correctly", (name, key) => {
    const newValue = "new_lorem";

    stateManager.addItem(key, "lorem", name, 0, 0);

    stateManager.updateItem(key, newValue, name, 0, 0, stateManager);

    expect(stateManager.getItem(key, name, undefined, stateManager).value).toBe(newValue);
  });

  it.each([
    [STATE_STATE_STORE, "value_key", STATE_STATE_STORE, "falsy_key"],
    [STATE_STATE_STORE, "value_key", "falsy_store", "value_key"],
  ])("should not update the item", (name, key, upName, upKey) => {
    const value = "lorem";
    const newValue = "new_lorem";

    stateManager.addItem(key, value, name, 0, 0);

    stateManager.updateItem(upKey, newValue, upName, 0, 0, stateManager);

    expect(stateManager.getItem(key, name, undefined, stateManager).value).toBe(value);
  });
});
