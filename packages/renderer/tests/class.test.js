import { RecursiveRenderer } from "..";

describe("Renderer", () => {
  const app = () => {
    return { elementType: "div" };
  };
  const root = {};

  const Renderer = new RecursiveRenderer(app, root);

  test("renderer-class delegate-to-renderer test", () => {
    expect(typeof Renderer.delegateToRenderer).toBe("function");
  });

  test("renderer-class run-phase test", () => {
    expect(typeof Renderer.runPhase).toBe("function");
  });

  test("renderer-class on-element-updated test", () => {
    expect(typeof Renderer.onElementUpdated).toBe("function");
  });

  test("renderer-class on-element-created test", () => {
    expect(typeof Renderer.onElementCreated).toBe("function");
  });

  test("renderer-class on-before-element-destroyed test", () => {
    expect(typeof Renderer.onBeforeElementDestroyed).toBe("function");
  });

  test("renderer-class on-element-destroyed test", () => {
    expect(typeof Renderer.onElementDestroyed).toBe("function");
  });

  test("renderer-class render-instance test", () => {
    expect(typeof Renderer.renderInstance).toBe("function");
  });

  test("renderer-class replace-element test", () => {
    expect(typeof Renderer.replaceElement).toBe("function");
  });

  test("renderer-class change-element-position test", () => {
    expect(typeof Renderer.changeElementPosition).toBe("function");
  });

  test("renderer-class remove-element test", () => {
    expect(typeof Renderer.removeElement).toBe("function");
  });

  test("renderer-class update-events test", () => {
    expect(typeof Renderer.updateEvents).toBe("function");
  });

  test("renderer-class update-attributes test", () => {
    expect(typeof Renderer.updateAttributes).toBe("function");
  });

  test("renderer-class update-children test", () => {
    expect(typeof Renderer.updateChildren).toBe("function");
  });

  test("renderer-class update-style test", () => {
    expect(typeof Renderer.updateStyle).toBe("function");
  });

  test("renderer-class update-element test", () => {
    expect(typeof Renderer.updateElement).toBe("function");
  });

  test("renderer-class set-instance-reference test", () => {
    expect(typeof Renderer.setInstanceReference).toBe("function");
  });

  test("renderer-class render test", () => {
    expect(typeof Renderer.render).toBe("function");
  });

  test("renderer-class update test", () => {
    expect(typeof Renderer.update).toBe("function");
  });

  test("renderer-class clean test", () => {
    expect(typeof Renderer.clean).toBe("function");
  });
});
