const { RecursiveRenderer } = require("../");
const {
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RENDERER_PHASE_ON_DESTROYED,
} = require("../../constants");

/**
 * Remove the given element from the tree of elements.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {RecursiveRenderer} renderer
 */
function removeElement(element, renderer) {
    renderer.onBeforeElementDestroyed(element);

    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
        renderer.useRendererRemoveElement(element);
    });

    renderer.onElementDestroyed(element);
}

module.exports = removeElement;
