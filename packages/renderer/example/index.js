const { RecursiveRenderer } = require("..");
const { ELEMENT_TYPE_TEXT_NODE } = require("../../constants");

class AbstractRenderer extends RecursiveRenderer {
    constructor(app, root) {
        super(app, root);
    }

    useRendererRemoveAttribute() {
        delete element.instance.attributes[attribute];
    }

    useRendererSetAttribute(attribute, value, element) {
        element.instance.attributes[attribute] = value;
    }

    useRendererItemInTree() {
        return true;
    }

    useRendererRemoveEvent(eventName, instance) {
        delete instance.events[eventName];
    }

    useRendererAddEvent(eventName, callback, element) {
        element.instance.events[eventName] = callback;
    }

    useRendererRenderTree() {
        const tree = this.renderInstance(this.current);

        this.root = tree;
    }

    useRendererAddElement(element, parentElement) {
        parentElement.instance.children.push(this.renderInstance(element));
    }

    useRendererReplaceElement(element, newElement) {
        element.instance = this.renderInstance(newElement);
    }

    useRendererIsAttribute(attribute) {
        const allowed = ["font", "background", "border", "animation"];

        return allowed.includes(attribute);
    }

    useRendererIsEvent(event) {
        const allowed = ["onClick", "onDoubledClick", "onHeld", "onSwiped"];

        return allowed.includes(event);
    }

    useRendererCreateInstance(element) {
        return element.elementType === ELEMENT_TYPE_TEXT_NODE
            ? element.children
            : { type: element.elementType, children: [], attributes: {}, events: {}, style: {} };
    }

    useRendererUpdateText(element, newElement) {
        element.instance = newElement.children;
    }

    useRendererUpdateStyle(element, newElement) {
        element.instance.style = newElement.style;
    }

    useRendererRemoveElement(element) {
        delete element.parent.instance.children[element.indexInParent];
    }

    useRendererInjectEvents(element, instance) {
        for (let key in element.events) {
            instance[key] = element.events[key];
        }
    }

    useRendererInjectAttributes(element, instance) {
        for (let key in element.attributes) {
            instance[key] = element.attributes[key];
        }
    }

    useRendererInjectChildren(element, instance) {
        element.children.forEach((child) => instance.children.push(this.renderInstance(child)));
    }

    useRendererClean() {}

    useRendererOnTreePrepared() {}

    useRendererChangeElementPosition(element, parentElement, position) {}
}

module.exports = { AbstractRenderer };
