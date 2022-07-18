import RecursiveRenderer from "../RecursiveRenderer.js";

/**
 * Remove the given element from the tree of elements.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {RecursiveRenderer} renderer
 */
function removeElement(element, renderer) {
    if (element.hooks && element.hooks.beforeDestroyed) {
        renderer.delegateToRenderer("beforeDestroyed", element.hooks.beforeDestroyed);
    }

    renderer.delegateToRenderer("changes", () => {
        renderer.useRendererRemoveElement(element);
    });

    if (element.hooks && element.hooks.onDestroyed) {
        renderer.delegateToRenderer("onDestroyed", element.hooks.onDestroyed);
    }
}

export default removeElement;
