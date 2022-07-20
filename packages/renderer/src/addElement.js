const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");
const isRecursiveElement = require("./isRecursiveElement");

/**
 * Append the given element into the provided parent element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} parentElement
 * @param {RecursiveRenderer} renderer
 */
function addElement(element, parentElement, renderer) {
    if (!isRecursiveElement(element)) return;

    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
        renderer.useRendererAddElement(element, parentElement)
    );

    renderer.onElementCreated(element);
}

module.exports = addElement;
