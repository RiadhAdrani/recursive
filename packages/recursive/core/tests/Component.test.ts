import { describe, it, expect } from "@jest/globals";
import { Component, ComponentSymbol, createComponentDeclaration } from "../Component";
import { ComponentImplementation } from "../types";

describe("Component", () => {
  const imp: ComponentImplementation<unknown, unknown> = {
    attributes: {
      add: () => 0,
      remove: () => 0,
      update: () => 0,
      is: () => true,
    },
    events: {
      add: () => 0,
      remove: () => 0,
      update: () => 0,
      is: () => true,
    },
    instance: {
      addChild: () => 0,
      changeChildPosition: () => 0,
      remove: () => 0,
      replace: () => 0,
      render: () => 0,
    },
  };

  const component = new Component("view", imp);
  const child1 = new Component("button", imp);
  const child2 = new Component("container", imp);
  const child3 = new Component("image", imp);
  const child4 = new Component("spacer", imp);

  it("should have a type", () => {
    expect(component.type).toBe("view");
  });

  it("should add an attribute", () => {
    component.addAttribute("color", "red");

    expect(component.attributes).toStrictEqual({ color: "red" });
  });

  it("should update an attribute", () => {
    component.updateAttribute("color", "blue");

    expect(component.attributes).toStrictEqual({ color: "blue" });
  });

  it("should throw an error when updating a non-existing attribute", () => {
    const fn = () => component.updateAttribute("text", "blue");

    expect(fn).toThrow();
  });

  it("should remove an attribute", () => {
    component.removeAttribute("color");

    expect(component.attributes).toStrictEqual({});
  });

  it("should throw an error when removing a non-existing attribute", () => {
    const fn = () => component.removeAttribute("color");

    expect(fn).toThrow();
  });

  it("should add an event", () => {
    const click = () => {
      1;
    };

    component.addEvent("click", click);

    expect(component.events).toStrictEqual({ click });
  });

  it("should throw when adding a non-function event", () => {
    const fn = () => component.addEvent("click", "str" as unknown as () => void);

    expect(fn).toThrow();
  });

  it("should update an event", () => {
    const click2 = () => {
      1;
    };

    component.updateEvent("click", click2);

    expect(component.events).toStrictEqual({ click: click2 });
  });

  it("should throw when trying to update a non-existing event", () => {
    const fn = () => component.updateEvent("input", () => 1);

    expect(fn).toThrow();
  });

  it("should throw when trying to update a event without a function", () => {
    const fn = () => component.updateEvent("click", "str" as unknown as () => void);

    expect(fn).toThrow();
  });

  it("should remove an event", () => {
    component.removeEvent("click");

    expect(component.events).toStrictEqual({});
  });

  it("should add a child", () => {
    component.addChild__Test(child1);

    expect(component.children).toStrictEqual([child1]);
  });

  it("should add a child at the given position", () => {
    component.addChild__Test(child2, 0);

    expect(component.children).toStrictEqual([child2, child1]);
  });

  it("should throw an error when trying to add a child at an invalid index", () => {
    expect(() => component.addChild__Test(child1, 3)).toThrow();
  });

  it("should remove a child", () => {
    component.removeChild(1);
    expect(component.children).toStrictEqual([child2]);

    component.removeChild(0);
    expect(component.children).toStrictEqual([]);
  });

  it("should throw an error when trying to remove a child at an invalid index", () => {
    expect(() => component.removeChild(0)).toThrow();
    expect(() => component.removeChild(1)).toThrow();
  });

  it.each([
    [0, 1, [child2, child1, child3]],
    [0, 2, [child2, child3, child1]],
    [1, 1, [child1, child2, child3]],
  ])("should change child position : (%s) -> (%s)", (from, to, expected) => {
    component.children = [];

    [child1, child2, child3].forEach((child) => component.addChild__Test(child));

    component.changeChildPosition(from, to);
    expect(component.children).toStrictEqual(expected);
  });

  it.each([
    [-1, 0],
    [0, -1],
    [3, 0],
    [0, 3],
  ])(
    "should throw an error when trying to change the position of a child from/to an invalid one : (%s) -> (%s)",
    (from, to) => {
      expect(() => component.changeChildPosition(from, to)).toThrow();
    }
  );

  it("should replace a component", () => {
    component.children = [];

    component.addChild(child1);
    expect(child1.parent === component).toBe(true);

    child1.replace(child4);

    expect(component.children[0] === child4).toBe(true);
    expect(child4.parent === component).toBe(true);
  });

  it("should create an object with signature", () => {
    expect(createComponentDeclaration("view", {})).toStrictEqual({
      __recursive__component__: ComponentSymbol,
      componentType: "view",
    });

    expect(createComponentDeclaration("view", { id: "name" })).toStrictEqual({
      __recursive__component__: ComponentSymbol,
      id: "name",
      componentType: "view",
    });
  });
});
