import RecursiveRenderer from "../RecursiveRenderer.js";

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
            if (!newElement.map[key]) {
                renderer.removeElement(element.children[element.map[key].index]);
                delete element.map[key];
            }
        }

        for (let key in element.map) {
            renderer.updateElement(
                element.children[element.map[key].index],
                newElement.children[newElement.map[key].index]
            );
        }

        for (let key in newElement.map) {
            if (!element.map[key]) {
                renderer.addElement(newElement.map[key].element, element);
                element.map[key] = {
                    key,
                    element: newElement.map[key].element,
                    index: Object.keys(element.map).length,
                };
            }
        }

        for (let key in element.map) {
            if (element.map[key].index !== newElement.map[key].index) {
                renderer.changeElementPosition(
                    element.map[key].element,
                    element,
                    newElement.map[key].index
                );
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

export default updateChildren;
