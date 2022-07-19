import { RecursiveRenderer } from "../";

/**
 * Inject the different attributes, events and children into the created instance;
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {RecursiveRenderer} renderer
 * @param {any} instance
 */
function renderInstance(element, renderer) {
    const _instance = renderer.useRendererCreateInstance(element);

    if (element.attributes) {
        renderer.useRendererInjectAttributes(element, _instance);
    }

    if (element.events) {
        renderer.useRendererInjectEvents(element, _instance);
    }

    if (Array.isArray(element.children)) {
        renderer.useRendererInjectChildren(element, _instance);
    }

    element.instance = _instance;

    renderer.onElementCreated(element);

    return _instance;
}

export default renderInstance;
