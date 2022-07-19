const { RecursiveRenderer } = require("../");
const {
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_ON_CREATED,
} = require("../../constants");

/**
 * Replace the given element by the new one.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function replaceElement(element, newElement, renderer) {
    if (element.hooks && element.hooks.beforeDestroyed) {
        renderer.delegateToRenderer(RENDERER_PHASE_BEFORE_DESTROYED, element.hooks.beforeDestroyed);
    }

    renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
        renderer.useRendererReplaceElement(element, newElement)
    );

    if (element.hooks && element.hooks.onDestroyed) {
        renderer.delegateToRenderer(RENDERER_PHASE_ON_DESTROYED, element.hooks.onDestroyed);
    }

    if (newElement.hooks && newElement.hooks.onCreated) {
        renderer.delegateToRenderer(RENDERER_PHASE_ON_CREATED, newElement.hooks.onCreated);
    }

    newElement.instance = element.instance;
}

module.exports = replaceElement;
