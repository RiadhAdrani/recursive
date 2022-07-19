const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");

/**
 * Change the position of the given element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function changeElementPosition(element, parentElement, newPosition, renderer) {
    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
        renderer.useRendererChangeElementPosition(element, parentElement, newPosition)
    );
}

module.exports = changeElementPosition;
