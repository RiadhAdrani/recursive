const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");

/**
 * Update events
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateEvents(element, newElement, renderer) {
    let combined = {};

    if (element.events) combined = { ...element.events };
    if (newElement.events) combined = { ...newElement.events };

    for (let event in combined) {
        if (newElement.events[event]) {
            renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                renderer.useRendererAddEvent(event, newElement.events[event], element);
            });
        } else {
            renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                renderer.useRendererRemoveEvent(event, element.instance);
            });
        }
    }
}

module.exports = updateEvents;
