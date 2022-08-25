const { RecursiveRenderer } = require("../");
const { ELEMENT_TYPE_RAW } = require("../../constants");

/**
 * Inject the different attributes, events and children into the created instance;
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {RecursiveRenderer} renderer
 * @param {any} instance
 */
function renderInstance(element, renderer) {
    const _instance =
        element.elementType === ELEMENT_TYPE_RAW
            ? renderer.useRendererCreateRawContainer(element)
            : renderer.useRendererCreateInstance(element);

    if (element.attributes) {
        for (let attr in element.attributes) {
            renderer.useRendererInjectAttribute(attr, element.attributes[attr], _instance);
        }
    }

    if (element.style) {
        renderer.useRendererInjectStyle(element.style, _instance);
    }

    if (element.events) {
        for (let ev in element.events) {
            renderer.useRendererInjectEvent(ev, element.events[ev], _instance);
        }
    }

    /**
     * We do not inject children in case of a raw type element.
     * It is the responsibility of useRendererCreateRawContainer
     */
    if (Array.isArray(element.children) && element.elementType !== ELEMENT_TYPE_RAW) {
        for (let child of element.children) {
            renderer.useRendererInjectChild(child, _instance);
        }
    }

    element.instance = _instance;

    renderer.onElementCreated(element);

    return _instance;
}

module.exports = renderInstance;
