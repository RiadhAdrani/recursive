const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");

/**
 * Replace the given element by the new one.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function replaceElement(element, newElement, renderer) {
    renderer.onBeforeElementDestroyed(element);

    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
        renderer.useRendererReplaceElement(element, newElement)
    );

    renderer.onElementDestroyed(element);

    newElement.instance = element.instance;
}

module.exports = replaceElement;
