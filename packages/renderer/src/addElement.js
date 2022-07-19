import { RecursiveRenderer } from "../";

/**
 * Append the given element into the provided parent element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} parentElement
 * @param {RecursiveRenderer} renderer
 */
function addElement(element, parentElement, renderer) {
    renderer.delegateToRenderer("changes", () =>
        renderer.useRendererAddElement(element, parentElement)
    );

    renderer.onElementCreated(element);
}

export default addElement;
