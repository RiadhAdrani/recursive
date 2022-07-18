import RecursiveRenderer from "../RecursiveRenderer.js";

/**
 * Change the position of the given element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function changeElementPosition(element, parentElement, newPosition, renderer) {
    renderer.delegateToRenderer("changes", () =>
        renderer.useRendererChangeElementPosition(element, parentElement, newPosition)
    );
}

export default changeElementPosition;
