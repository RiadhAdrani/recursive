import { describe, it, expect, beforeEach } from "@jest/globals";
import { INTERNAL_COLLECTION, REFERENCE_COLLECTION, STATE_COLLECTION, Store } from "../Store";
import { Callback } from "../types";

describe("Store", () => {
  let store: Store;

  beforeEach(() => {
    store = new Store(() => undefined);
  });

  it("should add effect", () => {
    const callback = () => undefined;

    store.addEffect("test", callback, []);

    expect(store.effects.items["test"]).toStrictEqual({
      key: "test",
      callback,
      dependencies: [],
      executed: false,
      cleanUp: undefined,
    });
  });

  it("should run clean up effect when dependencies changes", () => {
    const output: string[] = [];

    const callback = () => () => output.push("test");

    store.addEffect("test", callback, []);

    store.runEffects();

    store.addEffect("test", callback, [1]);

    expect(output).toStrictEqual(["test"]);
  });

  it("should queue an effect", () => {
    const callback = () => undefined;

    store.queueEffect(callback);

    expect(store.effects.queue).toStrictEqual([callback]);
  });

  it("should determine if effect already exists", () => {
    const callback = () => undefined;

    expect(store.effectExist("test")).toBe(false);

    store.addEffect("test", callback, []);

    expect(store.effectExist("test")).toBe(true);
  });

  it("should run effects", () => {
    const output: string[] = [];

    const callback = () => {
      output.push("removed");
    };

    store.addEffect("test", callback, []);

    store.runEffects();

    expect(output).toStrictEqual(["removed"]);
  });

  it("should remove and clean up effects", () => {
    const output: string[] = [];

    const callback = () => () => output.push("removed");

    store.addEffect("test", callback, []);
    store.runEffects();

    store.removeEffect("test");

    expect(output).toStrictEqual(["removed"]);
  });

  it("should add an item to a collection", () => {
    const output: string[] = [];

    const onRemoved = () => undefined;
    const onCreated = () => {
      output.push("test");

      return onRemoved;
    };

    store.add(STATE_COLLECTION, "test", "hello", false, onCreated);

    expect(store.collections[STATE_COLLECTION].items["test"]).toStrictEqual({
      addOrder: 0,
      global: false,
      history: [],
      value: "hello",
      onRemoved,
    });

    expect(output).toStrictEqual(["test"]);
  });

  it("should determine if a collection exists", () => {
    expect(store.collectionExists("my-collection")).toBe(false);
    expect(store.collectionExists(STATE_COLLECTION)).toBe(true);
  });

  it("should determine if an item exists", () => {
    expect(store.exists(STATE_COLLECTION, "test")).toBe(false);

    store.add(STATE_COLLECTION, "test", "hello");

    expect(store.exists(STATE_COLLECTION, "test")).toBe(true);
  });

  it("should get item from collection", () => {
    store.add(STATE_COLLECTION, "test", "hello");

    expect(store.get(STATE_COLLECTION, "test")).toStrictEqual({
      addOrder: 0,
      global: false,
      history: [],
      value: "hello",
      onRemoved: undefined,
    });
  });

  it("should throw when getting a non-existing item ", () => {
    expect(() => store.get("my-collection", "test")).toThrow();
    expect(() => store.get(STATE_COLLECTION, "test")).toThrow();
  });

  it("should remove an item and execute clean up effect", () => {
    const output: string[] = [];

    store.add(STATE_COLLECTION, "test", "hello", false, () => () => output.push("test"));

    store.remove(STATE_COLLECTION, "test");

    expect(store.collections[STATE_COLLECTION].items).toStrictEqual({});
    expect(output).toStrictEqual(["test"]);
  });

  it("should throw when removing a non-existing item ", () => {
    expect(() => store.remove("my-collection", "test")).toThrow();
    expect(() => store.remove(STATE_COLLECTION, "test")).toThrow();
  });

  it("should update an item", () => {
    store.add(STATE_COLLECTION, "test", "hello");

    store.update(STATE_COLLECTION, "test", "test-2");

    expect(store.collections[STATE_COLLECTION].items["test"]).toStrictEqual({
      addOrder: 0,
      global: false,
      history: ["hello"],
      value: "test-2",
      onRemoved: undefined,
    });
  });

  it("should not update item when new value is the same as the current one", () => {
    store.add(STATE_COLLECTION, "test", "hello");

    store.update(STATE_COLLECTION, "test", "hello");

    expect(store.collections[STATE_COLLECTION].items["test"]).toStrictEqual({
      addOrder: 0,
      global: false,
      history: [],
      value: "hello",
      onRemoved: undefined,
    });
  });

  it("should update with forceUpdate even when new value is the same as the current one", () => {
    store.add(STATE_COLLECTION, "test", "hello");

    store.update(STATE_COLLECTION, "test", "hello", true);

    expect(store.collections[STATE_COLLECTION].items["test"]).toStrictEqual({
      addOrder: 0,
      global: false,
      history: ["hello"],
      value: "hello",
      onRemoved: undefined,
    });
  });

  it("should execute onChange effect", () => {
    const store = new Store(() => {
      output.push("test");
    });

    const output: string[] = [];

    store.add(STATE_COLLECTION, "test", "hello");

    store.update(STATE_COLLECTION, "test", "hello", true);

    expect(output).toStrictEqual(["test"]);
  });

  it("should add item as used", () => {
    store.add(STATE_COLLECTION, "test", "hello");

    store.setUsed(STATE_COLLECTION, "test");

    expect(store.collections[STATE_COLLECTION].used).toStrictEqual(["test"]);
  });

  it("should throw when trying to set a non-existing item as used ", () => {
    expect(() => store.setUsed("my-collection", "test")).toThrow();
    expect(() => store.setUsed(STATE_COLLECTION, "test")).toThrow();
  });

  it("should reset usage of a collection", () => {
    store.add(STATE_COLLECTION, "test", "hello");

    store.setUsed(STATE_COLLECTION, "test");

    store.resetUsage(STATE_COLLECTION);

    expect(store.collections[STATE_COLLECTION].used).toStrictEqual([]);
  });

  it("should determine if item was used", () => {
    expect(store.wasUsed(STATE_COLLECTION, "test")).toBe(false);

    store.add(STATE_COLLECTION, "test", "hello");
    store.setUsed(STATE_COLLECTION, "test");

    expect(store.wasUsed(STATE_COLLECTION, "test")).toBe(true);
  });

  describe("State Collection", () => {
    const setState = <T>(key: string, value: T, onCreated?: Callback) =>
      store.collections[STATE_COLLECTION].set({ key, value, onCreated, global: false });

    const getState = <T>(key: string) => store.collections[STATE_COLLECTION].get<T>(key);

    const clear = () => store.collections[STATE_COLLECTION].clear();

    it("should set state", () => {
      const [count] = setState("test", 0);
      expect(count).toBe(0);
    });

    it("should return existing state", () => {
      setState("test", 0);

      const [count2] = setState("test", 10);
      expect(count2).toBe(0);
    });

    it("should get state", () => {
      setState("test", 0);
      const [count] = getState<number>("test");

      expect(count).toBe(0);
    });

    it("should clear unused states while keeping globals", () => {
      setState("test", 0);
      store.add(STATE_COLLECTION, "test-2", 0, false);
      store.add(STATE_COLLECTION, "test-3", 0, true);

      clear();

      expect(Object.keys(store.collections[STATE_COLLECTION].items)).toStrictEqual([
        "test",
        "test-3",
      ]);
    });
  });

  describe("Internal Collection", () => {
    const collection = INTERNAL_COLLECTION;

    const setInternal = <T>(key: string, value: T, onCreated?: Callback) =>
      store.collections[collection].set({ key, value, onCreated, global: true });

    const getInternal = <T>(key: string) => store.collections[collection].get<T>(key);

    const clear = () => store.collections[collection].clear();

    it("should set internal state", () => {
      const [count] = setInternal("test", 0);
      expect(count).toBe(0);
    });

    it("should return existing internal state", () => {
      setInternal("test", 0);

      const [count2] = setInternal("test", 10);
      expect(count2).toBe(0);
    });

    it("should get internal state", () => {
      setInternal("test", 0);
      const [count] = getInternal<number>("test");

      expect(count).toBe(0);
    });

    it("should not clear unused states while keeping globals", () => {
      setInternal("test", 0);
      setInternal("test-2", 0);
      setInternal("test-3", 0);

      clear();

      expect(Object.keys(store.collections[collection].items)).toStrictEqual([
        "test",
        "test-2",
        "test-3",
      ]);
    });
  });

  describe("Reference Collection", () => {
    const collection = REFERENCE_COLLECTION;

    const setReference = <T>(key: string, value: T, onCreated?: Callback) =>
      store.collections[collection].set({ key, value, onCreated, global: false });

    const getReference = <T>(key: string) => store.collections[collection].get<T>(key);

    const clear = () => store.collections[collection].clear();

    it("should set reference", () => {
      const [count] = setReference("test", 0);
      expect(count).toBe(0);
    });

    it("should throw when setting existing reference", () => {
      setReference("test", 0);

      expect(() => setReference("test", 10)).toThrow();
    });

    it("should get reference", () => {
      setReference("test", 0);
      const [count] = getReference<number>("test");

      expect(count).toBe(0);
    });

    it("should clear unused references", () => {
      setReference("test", 0);
      store.add(collection, "test-2", 0);
      store.add(collection, "test-3", 0);

      clear();

      expect(Object.keys(store.collections[collection].items)).toStrictEqual(["test"]);
    });
  });
});
