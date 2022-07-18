import RecursiveRenderer from "../RecursiveRenderer.js";

/**
 * Update attributes
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateAttributes(element, newElement, renderer) {
    let combined = {};

    if (element.attributes) combined = { ...element.attributes };
    if (newElement.attributes) combined = { ...newElement.attributes };

    for (let attr in combined) {
        if (newElement.attributes[attr] === undefined) {
            renderer.delegateToRenderer("changes", () => {
                renderer.useRendererRemoveAttribute(attr, element.instance);
            });
        } else {
            renderer.delegateToRenderer("changes", () => {
                renderer.useRendererSetAttribute(attr, newElement.attributes[attr], element);
            });
        }
    }
}

export default updateAttributes;
