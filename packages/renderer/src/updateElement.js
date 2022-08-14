const { RecursiveRenderer } = require("../");
const { RecursiveConsole } = require("../../console");
const { ELEMENT_TYPE_TEXT_NODE, ELEMENT_TYPE_RAW } = require("../../constants");

/**
 * Update the current element.
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateElement(element, newElement, renderer) {
    const instance = element.instance;

    if (!instance) {
        RecursiveConsole.error("Recursive Renderer : Instance of the element not found", [
            "This error can happen when you manipulate the dom directly.",
        ]);
    }

    if (element.flags && element.flags.forceRerender === true) {
        /**
         * The element requires to be rerendered
         * or/and replaced by the new Element
         */
        renderer.replaceElement(element, newElement);
    } else if (element.elementType !== newElement.elementType) {
        /**
         * Elements does not have the same type.
         * Just replace the old with the new one.
         */
        renderer.replaceElement(element, newElement);
    } else if (
        element.elementType === ELEMENT_TYPE_TEXT_NODE &&
        newElement.elementType === ELEMENT_TYPE_TEXT_NODE
    ) {
        /**
         * Both element are text nodes
         * we compare their children.
         */
        if (element.children !== newElement.children) {
            renderer.useRendererUpdateText(element, newElement);
        }
    } else {
        /**
         * Both elements have the same type.
         * We perform the classic routine of recursively
         * comparing attributes, events and children.
         */
        const eventsDidChange = renderer.updateEvents(element, newElement);
        const attributesDidChange = renderer.updateAttributes(element, newElement);

        renderer.updateStyle(element, newElement);

        if (element.elementType === ELEMENT_TYPE_RAW) {
            /**
             * We have two raw elements,
             * the implemented renderer should resolve the issue.
             */
            renderer.useRendererUpdateRawContainersAgainstEachOthers(element, newElement);
        } else {
            renderer.updateChildren(element, newElement);
        }

        if (eventsDidChange || attributesDidChange) {
            renderer.onElementUpdated(element);
        }
    }

    newElement.instance = instance;
}

module.exports = updateElement;
