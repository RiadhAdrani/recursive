import { get as getAtt, is as isAttt, isToggle } from "../recursive-dom/DomAttributes.js";
import { get as getEv, is as isEv, getListener, hasHandler } from "../recursive-dom/DomEvents.js";
import RecursiveRenderer from "../../core/recursive-renderer/RecursiveRenderer.js";
import { ElementType } from "../../core/recursive-renderer/RecursiveElement.js";
import RecursiveCSSOM from "../recursive-cssom/RecursiveCSSOM.js";

/**
 * ### `RecursiveWeb`
 * Web implementation of the `RecursiveRenderer`
 */
class RecursiveWebRenderer extends RecursiveRenderer {
    /**
     * Create an instance of `RecursiveWeb`
     * @param {Function} app
     * @param {HTMLElement} root
     */
    constructor(app, root) {
        super(app, root);
        this.styler = new RecursiveCSSOM();
    }

    /**
     * Create HTML element.
     *
     * Use `RendererOptions.ns` property to precise the namespace of the element.
     * By default it is set to render html element, but you can use other namespaces.
     * * `html` : http://www.w3.org/1999/xhtm
     * * `svg` : http://www.w3.org/2000/svg
     * * `math` : http://www.w3.org/1998/Math/MathML
     * @param {typeof ElementType} element
     * @returns {HTMLElement}
     */
    useRendererCreateInstance(element) {
        if (element.elementType === "#text") return document.createTextNode(element.children);

        let ns = "http://www.w3.org/1999/xhtml";

        if (element.rendererOptions && element.rendererOptions.ns) {
            ns = element.rendererOptions.ns;
        }

        return document.createElementNS(ns, element.elementType);
    }

    /**
     * Update text node inner value.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    useRendererUpdateText(element, newElement) {
        element.instance.data = newElement.children;
    }

    /**
     * Check if the given attribute is a DOM compatible
     * @param {string} attribute
     * @returns {boolean}
     */
    useRendererIsAttribute(attribute) {
        return isAttt(attribute);
    }

    /**
     * Check if the given event is a DOM compatible
     * @param {string} event
     * @returns {boolean}
     */
    useRendererIsEvent(event) {
        return isEv(event);
    }

    /**
     * Add event to the provided HTML instance.
     * @param {string} eventName
     * @param {Function} callback
     * @param {HTMLElement} instance
     */
    useRendererAddEvent(eventName, callback, instance) {
        const exists = instance.events[eventName] !== undefined;

        instance.events[eventName] = callback;

        if (!exists) {
            if (hasHandler(eventName)) {
                getEv(eventName).handler(instance);
            } else {
                instance.addEventListener(eventName, (e) => {
                    this.orchestrator.batchCallback(() => instance.events[eventName](e), eventName);
                });
            }
        }
    }

    /**
     * Check if the provided element exists in the DOM.
     * @param {typeof ElementType} element
     * @returns {boolean}
     */
    useRendererItemInTree(element) {
        return document.contains(element.instance);
    }

    /**
     * Inject attributes into the HTML instance.
     * @param {typeof ElementType} element
     * @param {HTMLElement} instance
     */
    useRendererInjectAttributes(element, instance) {
        for (let key in element.attributes) {
            if (key == "dataSet") {
                for (let item in element.attributes.dataSet) {
                    instance.dataset[item] = element.attributes.dataSet[item];
                }
            } else {
                if (isToggle(key)) {
                    instance.toggleAttribute(getAtt(key), element.attributes[key] == true);
                } else {
                    instance.setAttribute(getAtt(key), element.attributes[key]);
                }
            }
        }

        if (element.style && element.style.inline) {
            for (let prop in element.style.inline) {
                instance.style[prop] = element.style.inline[prop];
            }
        }
    }

    /**
     * Used to update the given attribute with the provided value.
     * @param {string} attribute
     * @param {string} value
     * @param {typeof ElementType} element
     */
    useRendererSetAttribute(attribute, value, element) {
        const instance = element.instance;

        if (attribute === "dataSet") {
            for (let item in instance.dataset) {
                if (value[item] !== instance.dataset[item]) {
                    instance.dataset[item] = value[item];
                }
            }

            for (let item in value) {
                if (instance.dataset[item] === undefined) {
                    instance.dataset[item] = value[item];
                }
            }
        } else if (isToggle(attribute)) {
            instance.toggleAttribute(getAtt(attribute), value == true);
        } else {
            instance.setAttribute(getAtt(attribute), value);
        }
    }

    /**
     * Update inline style.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    useRendererUpdateStyle(element, newElement) {
        if (element.style && element.style.inline) {
            for (let prop in element.style.inline) {
                if (
                    newElement.style &&
                    newElement.style.inline &&
                    newElement.style.inline[prop] &&
                    newElement.style.inline[prop] !== element.style.inline[prop]
                ) {
                    element.instance.style[prop] = newElement.style.inline[prop];
                } else {
                    element.instance.style[prop] = "";
                }
            }
        }

        if (newElement.style && newElement.style.inline) {
            for (let prop in newElement.style.inline) {
                element.instance.style[prop] = newElement.style.inline[prop];
            }
        }
    }

    /**
     * Inject event listeners into the HTML instance.
     * @param {typeof ElementType} element
     * @param {HTMLElement} instance
     */
    useRendererInjectEvents(element, instance) {
        instance.events = {};

        for (let ev in element.events) {
            instance.events[ev] = element.events[ev];

            if (hasHandler(ev)) {
                getEv(ev).handler(instance);
            } else {
                instance.addEventListener(getListener(ev), (e) => {
                    this.orchestrator.batchCallback(() => instance.events[ev](e), ev);
                });
            }
        }
    }

    /**
     * Inject children into the HTML instance
     * @param {typeof ElementType} element
     * @param {HTMLElement} instance
     */
    useRendererInjectChildren(element, instance) {
        element.children.forEach((child) => instance.append(this.renderInstance(child)));
    }

    /**
     * @unused
     */
    useRendererClean() {}

    /**
     * Inject the tree of computed components into the root element.
     */
    useRendererRenderTree() {
        const tree = this.renderInstance(this.current);
        this.root.append(tree);
    }

    /**
     * Check and update the `className` of the element.
     * @param {typeof ElementType} element
     */
    resolveClassName(element) {
        if (element.style && (element.style.scoped || element.style.className)) {
            let _class = element.style.className || "";

            if (element.style.scoped) {
                if (_class) _class += "-";

                _class += `${element.elementType}${element.uid}`;
            }

            if (element.attributes.className) element.attributes.className += " ";
            else element.attributes.className = "";

            element.attributes.className = element.attributes.className + _class;
            element.style.className = _class;
        }
    }

    /**
     * Flatten and return the `StyleSheets` of the elements' tree.
     * @param {typeof ElementType} element
     * @returns {Array<any>}
     */
    flattenStyle(element) {
        const output = [];

        if (Array.isArray(element.children)) {
            element.children.forEach((child) => {
                output.push(...this.flattenStyle(child));
            });
        }

        this.resolveClassName(element);

        if (element.style) {
            output.push(element.style);
        }

        return output;
    }

    /**
     * Remove the provided attribute.
     * @param {typeof ElementType} attribute
     * @param {HTMLElement} instance
     */
    useRendererRemoveAttribute(attribute, instance) {
        instance.removeAttribute(attribute);
    }

    /**
     * Apply style and post-computation effects.
     * @param {typeof ElementType} tree
     */
    useRendererOnTreePrepared(tree) {
        const style = this.flattenStyle(tree);

        this.styler.update(style);
    }

    /**
     * Append an element to the DOM.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} parentElement
     */
    useRendererAddElement(element, parentElement) {
        parentElement.instance.append(this.renderInstance(element));
    }

    /**
     * Change the position of an element in the given node element.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} parentElement
     * @param {number} newPosition
     */
    useRendererChangeElementPosition(element, parentElement, newPosition) {
        parentElement.instance.insertBefore(
            element.instance,
            parentElement.instance.children[newPosition]
        );
    }

    /**
     * Replace the given element with the new one.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    useRendererReplaceElement(element, newElement) {
        element.instance.replaceWith(this.renderInstance(newElement));
    }

    /**
     * Remove the provided element from the DOM.
     * @param {typeof ElementType} element
     */
    useRendererRemoveElement(element) {
        element.instance.remove();
    }
}

export default RecursiveWebRenderer;
