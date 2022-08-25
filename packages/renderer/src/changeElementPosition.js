const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");

/**
 * Change the position of the given element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function changeElementPosition(element, newPosition, renderer) {
    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
        renderer.useRendererChangeElementPosition(element, newPosition)
    );
}

module.exports = changeElementPosition;
