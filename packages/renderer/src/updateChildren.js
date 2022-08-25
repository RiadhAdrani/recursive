const { RecursiveRenderer } = require("../");

/**
 * Update children
 * @param {import("../../../lib.js").RecursiveElement} element
 * @param {import("../../../lib.js").RecursiveElement} newElement
 * @param {RecursiveRenderer} renderer
 */
function updateChildren(element, newElement, renderer) {
    /**
     * We check if all elements are in the tree.
     * If one child is missing,
     * we correct the tree by directly replacing the current one with the new one.
     */
    for (let i in element.children) {
        if (!renderer.useRendererItemInTree(element.children[i])) {
            renderer.replaceElement(element, newElement);
            return;
        }
    }

    if (element.map && newElement.map) {
        /**
         * We start by removing the excess elements
         */
        for (let key in element.map) {
            if (newElement.map[key] == undefined) {
                renderer.removeElement(element.children[element.map[key]]);
            }
        }

        /**
         * then, we iterate through the new elements
         */
        for (let key in newElement.map) {
            const newPosition = newElement.map[key];
            const newChild = newElement.children[newPosition];

            if (element.map[key] == undefined) {
                /**
                 * If the new element does not exist in the old map
                 * we should append it in the correct position.
                 */
                renderer.addElement(newChild, newPosition);
            } else {
                /**
                 * If the element already exits,
                 * we change its position if it needs to be changed.
                 */
                const oldPosition = element.map[key];
                const oldChild = element.children[oldPosition];

                if (renderer.useRendererGetElementPosition(oldChild) != newPosition) {
                    renderer.changeElementPosition(oldChild, newPosition);
                }

                renderer.updateElement(oldChild, newChild);
            }
        }
    } else {
        if (element.children.length == newElement.children.length) {
            /**
             * If both elements have the same number of children
             * we diff them directly
             */
            updateEqualChildrenRecursively(element.children, newElement.children, renderer);
        } else if (element.children.length > newElement.children.length) {
            /**
             * If the currently rendered element have more children
             * we remove elements till their numbers are equal.
             */
            while (element.children.length > newElement.children.length) {
                renderer.removeElement(element.children.pop());
            }

            updateEqualChildrenRecursively(
                element.children.slice(0, newElement.children.length),
                newElement.children,
                renderer
            );
        } else {
            /**
             * New element have more children
             * We add the excess and update the rest.
             */
            for (let i = element.children.length; i < newElement.children.length; i++) {
                renderer.addElement(newElement.children[i], element);
            }

            updateEqualChildrenRecursively(
                element.children,
                newElement.children.slice(0, element.children.length),
                renderer
            );
        }
    }
}

/**
 * Update equal children recursively.
 * @param {Array<import("../../../lib.js").RecursiveElement>} elementChildren
 * @param {Array<import("../../../lib.js").RecursiveElement>} newElementChildren
 * @param {RecursiveRenderer} renderer
 */
function updateEqualChildrenRecursively(elementChildren, newElementChildren, renderer) {
    for (let i = 0; i < elementChildren.length; i++) {
        renderer.updateElement(elementChildren[i], newElementChildren[i]);
    }
}

module.exports = updateChildren;
