import { describe, it, expect } from "@jest/globals";
import ContextStore from "../ContextStore";

describe("ContextStore", () => {
  const store = new ContextStore<string>();

  it("should contextualize correctly", () => {
    expect(store.get()).toBe(undefined);

    store.contextualize(() => {
      expect(store.get()).toBe("hello");
    }, "hello");

    expect(store.get()).toBe(undefined);
  });

  it("should throw when context data is undefined", () => {
    expect.assertions(1);

    expect(() => {
      return store.contextualize(() => "Hello", undefined as unknown as string);
    }).toThrow("Invalid context data.");
  });

  it("should return the callback result", () => {
    const res = store.contextualize(() => {
      return "hello";
    }, "ctx");

    expect(res).toBe("hello");
  });
});
