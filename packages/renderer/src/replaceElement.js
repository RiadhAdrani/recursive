import RecursiveRenderer from "../RecursiveRenderer.js";

/**
 * Replace the given element by the new one.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function replaceElement(element, newElement, renderer) {
    if (element.hooks && element.hooks.beforeDestroyed) {
        renderer.delegateToRenderer("beforeDestroyed", element.hooks.beforeDestroyed);
    }

    renderer.delegateToRenderer("changes", () =>
        renderer.useRendererReplaceElement(element, newElement)
    );

    if (element.hooks && element.hooks.onDestroyed) {
        renderer.delegateToRenderer("onDestroyed", element.hooks.onDestroyed);
    }

    if (newElement.hooks && newElement.hooks.onCreated) {
        renderer.delegateToRenderer("onCreated", newElement.hooks.onCreated);
    }

    newElement.instance = element.instance;
}

export default replaceElement;
