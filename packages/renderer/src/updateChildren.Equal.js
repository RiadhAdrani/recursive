const { RecursiveRenderer } = require("../");

/**
 * Update equal children
 * @param {Array<import("../../../lib.js").RecursiveElement>} elementChildren
 * @param {Array<import("../../../lib.js").RecursiveElement>} newElementChildren
 * @param {RecursiveRenderer} renderer
 */
function updateChildrenEqual(elementChildren, newElementChildren, renderer) {
    for (let i = 0; i < elementChildren.length; i++) {
        renderer.updateElement(elementChildren[i], newElementChildren[i]);
    }
}

module.exports = updateChildrenEqual;
