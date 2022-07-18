import RecursiveRenderer from "../RecursiveRenderer.js";

/**
 * Register element into the reference store.
 * @param {import("../../lib.js").RecursiveElement} element
 * @param {RecursiveRenderer} renderer
 */
function setInstanceReference(element, renderer) {
    if (element.hooks && typeof element.hooks.onRef === "function") {
        const ref = element.hooks.onRef(element.instance);

        if (typeof ref === "string") {
            renderer.stateManager.setRef(ref, element.instance);
        }
    }

    if (Array.isArray(element.children))
        element.children.forEach((child) => {
            renderer.setInstanceReference(child);
        });
}

export default setInstanceReference;
