const { RecursiveRenderer } = require("../");
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
        RecursiveConsole.error("Element not found, renderer error should not happen.");
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
        renderer.updateEvents(element, newElement);
        renderer.updateAttributes(element, newElement);
        renderer.updateStyle(element, newElement);
        renderer.updateChildren(element, newElement);
    }

    newElement.instance = instance;
}

module.exports = updateElement;
