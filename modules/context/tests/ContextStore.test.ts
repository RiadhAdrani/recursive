import { describe, it, expect } from "@jest/globals";
import ContextStore from "../ContextStore";

describe("ContextStore", () => {
  const store = new ContextStore<string>();

  it("should contextualize correctly", async () => {
    expect(store.get()).toBe(undefined);

    await store.contextualize(() => {
      expect(store.get()).toBe("hello");
    }, "hello");

    expect(store.get()).toBe(undefined);
  });

  it("should replace old context and push it to the stored", async () => {
    await store.contextualize(async () => {
      expect(store.get()).toBe("hello");

      await store.contextualize(async () => {
        expect(store.get()).toBe("world");

        await store.contextualize(() => {
          expect(store.get()).toBe(undefined);
        });
      }, "world");
    }, "hello");
  });

  it("should return the callback result", async () => {
    const res = await store.contextualize(() => {
      return "hello";
    });

    expect(res).toBe("hello");
  });
});