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
    if (element.hooks && element.hooks.beforeDestroyed) {
        renderer.delegateToRenderer(RENDERER_PHASE_BEFORE_DESTROYED, element.hooks.beforeDestroyed);
    }

    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
        renderer.useRendererRemoveElement(element);
    });

    if (element.hooks && element.hooks.onDestroyed) {
        renderer.delegateToRenderer(RENDERER_PHASE_ON_DESTROYED, element.hooks.onDestroyed);
    }
}

module.exports = removeElement;
