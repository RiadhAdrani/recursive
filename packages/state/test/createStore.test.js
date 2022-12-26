import { RecursiveState } from "..";

describe("RecursiveState.createStore", () => {
  let stateManager = new RecursiveState();

  beforeEach(() => {
    stateManager = new RecursiveState();
  });

  it.each([["storage"]])("should create store with valid input", (name) => {
    stateManager.createStore(
      {
        name,
        clear: () => {},
        flush: () => {},
        get: () => {},
        obj: {},
        set: () => {},
      },
      stateManager
    );

    expect(Object.keys(stateManager.stores[name].items).length).toBeDefined();
  });

  it.each([
    [undefined, () => {}, () => {}, () => {}, () => {}],
    [null, () => {}, () => {}, () => {}, () => {}],
    ["", () => {}, () => {}, () => {}, () => {}],
    [" ", () => {}, () => {}, () => {}, () => {}],
    ["storage", null, () => {}, () => {}, () => {}],
    ["storage", () => {}, null, () => {}, () => {}],
    ["storage", () => {}, () => {}, null, () => {}],
    ["storage", () => {}, () => {}, () => {}, null],
  ])("should decline any invalid property", (name, clear, flush, get, set) => {
    stateManager.createStore(
      {
        name,
        clear,
        flush,
        get,
        obj: {},
        set,
      },
      stateManager
    );

    expect(stateManager.stores[name]).toBeFalsy();
  });
});
