const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");
const { makeDiffList } = require("../utility");

/**
 * Update attributes
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateAttributes(element, newElement, renderer) {
    const combined = makeDiffList(element.attributes, newElement.attributes);

    for (let key in combined.toUpdate) {
        renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            renderer.useRendererSetAttribute(key, combined.toUpdate[key], element);
        });
    }

    for (let key in combined.toAdd) {
        renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            renderer.useRendererSetAttribute(key, combined.toAdd[key], element);
        });
    }

    for (let key in combined.toRemove) {
        renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            renderer.useRendererRemoveAttribute(key, element.instance);
        });
    }

    return (
        Object.keys(combined.toRemove).length > 0 ||
        Object.keys(combined.toAdd).length > 0 ||
        Object.keys(combined.toUpdate).length > 0
    );
}

module.exports = updateAttributes;
