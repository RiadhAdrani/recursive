import { RecursiveRenderer } from "../";

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
            renderer.delegateToRenderer("changes", () => {
                renderer.useRendererAddEvent(event, newElement.events[event], element);
            });
        } else {
            renderer.delegateToRenderer("changes", () => {
                renderer.useRendererRemoveEvent(event, element.instance);
            });
        }
    }
}

export default updateEvents;
