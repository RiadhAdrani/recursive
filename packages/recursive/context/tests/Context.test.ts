import { describe, it, expect } from "@jest/globals";
import Context from "../Context";
import ContextStore from "../ContextStore";

describe("ContextStore", () => {
  const ctx = new Context();

  const STATE = "state";
  const CORE = "core";

  ctx.addStore(STATE, new ContextStore<Record<string, unknown>>());
  ctx.addStore(CORE, new ContextStore<string>());

  it("should add store", () => {
    expect(ctx.stores[STATE]).toBeTruthy();
  });

  it("should throw when store already exists", () => {
    const fn = () => ctx.addStore(STATE, new ContextStore<Record<string, unknown>>());

    expect(fn).toThrow();
  });

  it("should get named context", () => {
    ctx.contextualizeNamed(
      () => {
        expect(ctx.getNamed(STATE)).toStrictEqual({ state: "id", value: 3 });
      },
      STATE,
      { state: "id", value: 3 }
    );

    ctx.contextualizeNamed(
      () => {
        expect(ctx.getNamed(CORE)).toStrictEqual("core");
      },
      CORE,
      "core"
    );

    ctx.contextualizeNamed(
      () => {
        ctx.contextualizeNamed(
          () => {
            expect(ctx.getNamed(CORE)).toBe("div");
            expect(ctx.getNamed(STATE)).toStrictEqual({ value: 2 });
          },
          STATE,
          { value: 2 }
        );
      },
      CORE,
      "div"
    );
  });
});
