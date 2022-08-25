const { RecursiveRenderer } = require("../");

/**
 * Update children
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateChildren(element, newElement, renderer) {
    for (let i in element.children) {
        if (!renderer.useRendererItemInTree(element.children[i])) {
            renderer.replaceElement(element, newElement);
            return;
        }
    }

    if (element.map && newElement.map) {
        for (let key in element.map) {
            if (newElement.map[key] == undefined) {
                renderer.removeElement(element.children[element.map[key]]);
            }
        }

        for (let key in newElement.map) {
            const newPosition = newElement.map[key];
            const newChild = newElement.children[newPosition];
            if (element.map[key] == undefined) {
                renderer.addElement(newChild, newPosition);
            } else {
                const oldPosition = element.map[key];
                const oldChild = element.children[oldPosition];
                renderer.changeElementPosition(oldChild, newPosition);
                renderer.updateElement(oldChild, newChild);
            }
        }
    } else {
        if (element.children.length == newElement.children.length) {
            renderer.updateEqualChildren(element.children, newElement.children);
        } else if (element.children.length > newElement.children.length) {
            while (element.children.length > newElement.children.length) {
                renderer.removeElement(element.children.pop());
            }
            renderer.updateEqualChildren(
                element.children.slice(0, newElement.children.length),
                newElement.children
            );
        } else {
            for (let i = element.children.length; i < newElement.children.length; i++) {
                renderer.addElement(newElement.children[i], element);
            }

            renderer.updateEqualChildren(
                element.children,
                newElement.children.slice(0, element.children.length)
            );
        }
    }
}

module.exports = updateChildren;
