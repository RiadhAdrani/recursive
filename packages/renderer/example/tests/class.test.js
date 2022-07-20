const { AbstractRenderer } = require("..");

describe("Renderer", () => {
    const app = () => {
        return { elementType: "div" };
    };

    let root = {};

    const Renderer = new AbstractRenderer(app, root);

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

    test("renderer-class update-equal-children test", () => {
        expect(typeof Renderer.updateEqualChildren).toBe("function");
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

    test("renderer-class use-renderer-remove-attribute test", () => {
        expect(typeof Renderer.useRendererRemoveAttribute).toBe("function");
    });

    test("renderer-class use-on-tree-prepared test", () => {
        expect(typeof Renderer.useRendererOnTreePrepared).toBe("function");
    });

    test("renderer-class use-renderer-add-element test", () => {
        expect(typeof Renderer.useRendererAddElement).toBe("function");
    });

    test("renderer-class use-renderer-change-element-position test", () => {
        expect(typeof Renderer.useRendererChangeElementPosition).toBe("function");
    });

    test("renderer-class use-renderer-replace-element test", () => {
        expect(typeof Renderer.useRendererReplaceElement).toBe("function");
    });

    test("renderer-class use-renderer-remove-element test", () => {
        expect(typeof Renderer.useRendererRemoveElement).toBe("function");
    });

    test("renderer-class use-renderer-remove-event test", () => {
        expect(typeof Renderer.useRendererRemoveEvent).toBe("function");
    });

    test("renderer-class use-renderer-create-instance test", () => {
        expect(typeof Renderer.useRendererCreateInstance).toBe("function");
    });

    test("renderer-class use-renderer-update-text test", () => {
        expect(typeof Renderer.useRendererUpdateText).toBe("function");
    });

    test("renderer-class use-renderer-is-attribute test", () => {
        expect(typeof Renderer.useRendererIsAttribute).toBe("function");
    });

    test("renderer-class use-renderer-is-event test", () => {
        expect(typeof Renderer.useRendererIsEvent).toBe("function");
    });

    test("renderer-class use-renderer-add-event test", () => {
        expect(typeof Renderer.useRendererAddEvent).toBe("function");
    });

    test("renderer-class use-renderer-item-in-tree test", () => {
        expect(typeof Renderer.useRendererItemInTree).toBe("function");
    });

    test("renderer-class use-renderer-inject-attributes test", () => {
        expect(typeof Renderer.useRendererInjectAttributes).toBe("function");
    });

    test("renderer-class use-renderer-set-attribute test", () => {
        expect(typeof Renderer.useRendererSetAttribute).toBe("function");
    });

    test("renderer-class use-renderer-update-style test", () => {
        expect(typeof Renderer.useRendererUpdateStyle).toBe("function");
    });

    test("renderer-class use-renderer-inject-event test", () => {
        expect(typeof Renderer.useRendererInjectEvents).toBe("function");
    });

    test("renderer-class use-renderer-inject-children test", () => {
        expect(typeof Renderer.useRendererInjectChildren).toBe("function");
    });

    test("renderer-class use-renderer-clean test", () => {
        expect(typeof Renderer.useRendererClean).toBe("function");
    });

    test("renderer-class use-renderer-render-tree test", () => {
        expect(typeof Renderer.useRendererRenderTree).toBe("function");
    });
});
