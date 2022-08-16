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

        /**
         * A boolean indicating if at least a change in events happened.
         */
        const eventsDidChange = renderer.updateEvents(element, newElement);
        /**
         * A boolean indicating if at least a change in attributes happened.
         * Performing the update twice
         * Because some attributes should be updated before others,
         * we don't know the specific order.
         * If it is not updated on the first run,
         * it will surely be updated on the second one.
         * This operation could costly on some platforms,
         * but it surely reduce performance.
         *
         * This is but a temporary fix.
         * The real checking should be performed within
         * `recursive-web`.
         */
        const attributesDidChange =
            renderer.updateAttributes(element, newElement) &&
            renderer.updateAttributes(element, newElement);

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
