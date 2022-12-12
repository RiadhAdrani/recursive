import { describe, it, expect, beforeEach } from "@jest/globals";
import { Core } from "../Core";
import { STATE_COLLECTION } from "../Store";

describe("Core", () => {
  let core: Core;

  beforeEach(() => {
    core = new Core();
  });

  it("should set state within context", () => {
    core.context.contextualize(() => {
      core.setState("test", "hello");
    }, {});

    const items = core.store.collections[STATE_COLLECTION].items;

    expect(items).toStrictEqual({
      test: { value: "hello", addOrder: 0, global: false, history: [], onRemoved: undefined },
    });
  });

  it("should set state outside context", () => {
    core.setState("test", "hello");

    const items = core.store.collections[STATE_COLLECTION].items;

    expect(items).toStrictEqual({
      test: { value: "hello", addOrder: 0, global: true, history: [], onRemoved: undefined },
    });
  });
});
