import { RecursiveState } from "..";

describe("RecursiveState", () => {
  let StateManager = new RecursiveState();

  beforeEach(() => {
    StateManager = new RecursiveState();
  });

  it("should have a state store", () => {
    expect(StateManager.stores.state).toBeDefined();
  });

  it("should have a cache store", () => {
    expect(StateManager.stores.cache).toBeDefined();
  });

  it("should have a state ref", () => {
    expect(StateManager.stores.ref).toBeDefined();
  });

  it("should have a state reserved", () => {
    expect(StateManager.stores.reserved).toBeDefined();
  });
});
