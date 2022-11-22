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

  it("should throw when context data is undefined", async () => {
    expect.assertions(1);

    expect(async () => {
      return await store.contextualize(() => "Hello", undefined as unknown as string);
    }).rejects.toEqual("Invalid context data.");
  });

  it("should return the callback result", async () => {
    const res = await store.contextualize(() => {
      return "hello";
    }, "ctx");

    expect(res).toBe("hello");
  });
});
