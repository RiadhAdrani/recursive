const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");
const { makeDiffList } = require("../utility");

/**
 * Update events
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 * @param {boolean}
 */
function updateEvents(element, newElement, renderer) {
    const combined = makeDiffList(element.events, newElement.events);

    for (let key in combined.toUpdate) {
        renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            renderer.useRendererAddEvent(key, combined.toUpdate[key], element);
        });
    }

    for (let key in combined.toAdd) {
        renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            renderer.useRendererAddEvent(key, combined.toAdd[key], element);
        });
    }

    for (let key in combined.toRemove) {
        renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            renderer.useRendererRemoveEvent(key, element.instance);
        });
    }

    return Object.keys(combined.toRemove).length > 0 || Object.keys(combined.toAdd).length > 0;
}

module.exports = updateEvents;
