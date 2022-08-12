const { RecursiveRenderer } = require("../");
const { RecursiveConsole } = require("../../console");
const { ELEMENT_TYPE_TEXT_NODE } = require("../../constants");

/**
 * Update the current element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateElement(element, newElement, renderer) {
    const instance = element.instance;

    if (!instance) {
        RecursiveConsole.error(
            "Recursive Renderer : Element not found, renderer error should not happen."
        );
    }

    if (element.flags && element.flags.forceRerender === true) {
        renderer.replaceElement(element, newElement);
    } else if (element.elementType !== newElement.elementType) {
        renderer.replaceElement(element, newElement);
    } else if (
        element.elementType === ELEMENT_TYPE_TEXT_NODE &&
        newElement.elementType === ELEMENT_TYPE_TEXT_NODE
    ) {
        if (element.children !== newElement.children) {
            renderer.useRendererUpdateText(element, newElement);
        }
    } else {
        const eventsDidChange = renderer.updateEvents(element, newElement);
        const attributesDidChange = renderer.updateAttributes(element, newElement);

        if (eventsDidChange || attributesDidChange) {
            renderer.onElementUpdated(element);
        }

        renderer.updateStyle(element, newElement);
        renderer.updateChildren(element, newElement);
    }

    newElement.instance = instance;
}

module.exports = updateElement;
