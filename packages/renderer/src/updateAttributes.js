const { RecursiveRenderer } = require("../");
const { RENDERER_PHASE_CHANGES } = require("../../constants");

/**
 * Update attributes
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateAttributes(element, newElement, renderer) {
    let combined = {};

    if (element.attributes) combined = { ...element.attributes };
    if (newElement.attributes) combined = { ...newElement.attributes };

    for (let attr in combined) {
        if (newElement.attributes[attr] === undefined) {
            renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                renderer.useRendererRemoveAttribute(attr, element.instance);
            });
        } else {
            renderer.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                renderer.useRendererSetAttribute(attr, newElement.attributes[attr], element);
            });
        }
    }
}

module.exports = updateAttributes;
