import { throwError } from "../recursive-error/RecursiveError.js";
import RecursiveOrchestrator from "../recursive-orchestrator/RecursiveOrchestrator.js";
import { ElementType } from "./RecursiveElement.js";
import { isFlag } from "./RecursiveFlags.js";
import { isHook } from "./RecursiveHooks.js";

/**
 * ### `RecursiveRenderer`
 * Used as a template to implement a native renderer.
 *
 * These methods should be implemented, otherwise they will throw `errors`
 * * `useRendererClean`
 * * `useRendererOnTreePrepared`
 * * `useRendererRemoveAttribute`
 * * `useRendererSetAttribute`
 * * `useRendererItemInTree`
 * * `useRendererRemoveEvent`
 * * `useRendererAddEvent`
 * * `useRendererRenderTree`
 * * `useRendererChangeElementPosition`
 * * `useRendererRemoveElement`
 * * `useRendererAddElement`
 * * `useRendererReplaceElement`
 * * `useRendererIsAttribute`
 * * `useRendererIsEvent`
 * * `useRendererCreateInstance`
 * * `useRendererInjectEvents`
 * * `useRendererInjectChildren`
 */
class RecursiveRenderer {
    /**
     * Create a new recursive renderer.
     * @param {() => typeof ElementType} app function returning the tree of elements
     * @param {any} root
     */
    constructor(app, root) {
        this.orchestrator = undefined;
        this.stateManager = undefined;

        this.app = app;
        this.root = root;
        this.current = undefined;
        this.phases = {
            onCreated: [],
            onUpdated: [],
            beforeDestroyed: [],
            onDestroyed: [],
            changes: [],
        };
    }

    /**
     * Store the given callback in the provided phase
     * @param {string} phase
     * @param {function} callback
     * @returns
     */
    delegateToRenderer(phase, callback) {
        if (!this.phases[phase] || typeof callback !== "function") return;

        this.phases[phase].push(callback);
    }

    /**
     * Run the provided phase actions if it exists.
     * @param {string} phase identifier name
     */
    runPhase(phase) {
        if (!this.phases || !Array.isArray(this.phases[phase])) return;

        this.phases[phase].forEach((action) => {
            if (typeof action === "function") action();
        });
    }

    /**
     * Return a verified element child
     * @param {typeof ElementType} child
     * @return {typeof ElementType} element
     */
    prepareElementChild(child, parent) {
        if ([null, undefined].includes(child)) return false;

        if (!child.elementType)
            return { elementType: "#text", children: child, instance: undefined };
        else {
            if (child.flags && child.flags.renderIf === false) {
                return false;
            } else {
                return this.prepare(child, parent);
            }
        }
    }

    /**
     * Return a verified tree to be used in rendering or updating
     * @param {typeof ElementType} element
     * @return {typeof ElementType} tree
     */
    prepare(element) {
        const _element = {};

        if (!element.elementType) {
            throwError('"elementType" should not be empty of null', [
                "Make sure to provide a type for your element (ex: div in web)",
            ]);
        }

        _element.elementType = element.elementType;
        _element.events = {};
        _element.attributes = {};
        _element.children = [];
        _element.hooks = {};
        _element.flags = {};
        _element.instance = {};
        _element.style = {};
        _element.map = false;
        _element.key = element.key;
        _element.ref = undefined;
        _element.style = element.style;
        _element.rendererOptions = element.rendererOptions;

        for (let property in element) {
            if (property === "flag") {
                for (let flag in element.flags) {
                    if (isFlag(flag)) {
                        _element.flags[flag] = element.flags[flag];
                    }
                }
            }

            if (property === "hooks") {
                for (let hook in element.hooks) {
                    if (isHook(hook, element.hooks[hook])) {
                        _element.hooks[hook] = element.hooks[hook];
                    }
                }
            }

            if (this.useRendererIsEvent(property)) {
                _element.events[property] = element[property];
                continue;
            }

            if (this.useRendererIsAttribute(property)) {
                _element.attributes[property] = element[property];
                continue;
            }
        }

        if (![null, undefined].includes(element.children)) {
            let _children = [];

            if (Array.isArray(element.children)) {
                element.children.forEach((child) => {
                    const _child = this.prepareElementChild(child);

                    if (_child) _children.push(_child);

                    if (
                        _element.map !== false &&
                        _child.key !== undefined &&
                        _element.map[_child.key] === undefined
                    ) {
                        _element.map[_child.key] = {
                            key: _child.key,
                            element: _child,
                            index: _children.length - 1,
                        };
                    } else {
                        _element.map = false;
                    }
                });
            } else {
                const _child = this.prepareElementChild(element.children, element);

                if (_child) _children = [_child];
            }

            _element.children = _children;
        }

        return _element;
    }

    /**
     * Delegate the call of the `onUpdated` hook to the renderer
     * @param {typeof ElementType} element
     */
    onElementUpdated(element) {
        if (element.hooks) this.delegateToRenderer("onUpdated", element.hooks.onUpdated);
    }

    /**
     * Delegate the call of the `onCreated` hook to the renderer
     * @param {typeof ElementType} element
     */
    onElementCreated(element) {
        if (element.hooks && element.hooks.onCreated)
            this.delegateToRenderer("onCreated", () => element.hooks.onCreated(element.instance));
    }

    /**
     * Delegate the call of the `beforeDestroyed` hook to the renderer
     * @param {typeof ElementType} element
     */
    onBeforeElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer("beforeDestroyed", element.hooks.beforeDestroyed);
    }

    /**
     * Delegate the call of the `onDestroyed` hook to the renderer
     * @param {typeof ElementType} element
     */
    onElementDestroyed(element) {
        if (element.hooks) this.delegateToRenderer("onDestroyed", element.hooks.onDestroyed);
    }

    /**
     * Inject the different attributes, events and children into the created instance;
     * @param {typeof ElementType} element
     * @param {any} instance
     */
    renderInstance(element) {
        const _instance = this.useRendererCreateInstance(element);

        if (element.attributes) {
            this.useRendererInjectAttributes(element, _instance);
        }

        if (element.events) {
            this.useRendererInjectEvents(element, _instance);
        }

        if (Array.isArray(element.children)) {
            this.useRendererInjectChildren(element, _instance);
        }

        element.instance = _instance;

        this.onElementCreated(element);

        return _instance;
    }

    /**
     * Replace the given element by the new one.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    replaceElement(element, newElement) {
        if (element.hooks && element.hooks.beforeDestroyed) {
            this.delegateToRenderer("beforeDestroyed", element.hooks.beforeDestroyed);
        }

        this.delegateToRenderer("changes", () =>
            this.useRendererReplaceElement(element, newElement)
        );

        if (element.hooks && element.hooks.onDestroyed) {
            this.delegateToRenderer("onDestroyed", element.hooks.onDestroyed);
        }

        if (newElement.hooks && newElement.hooks.onCreated) {
            this.delegateToRenderer("onCreated", newElement.hooks.onCreated);
        }

        newElement.instance = element.instance;
    }

    /**
     * Append the given element into the provided parent element.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} parentElement
     */
    addElement(element, parentElement) {
        this.delegateToRenderer("changes", () =>
            this.useRendererAddElement(element, parentElement)
        );

        this.onElementCreated(element);
    }

    /**
     * Change the position of the given element.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    changeElementPosition(element, parentElement, newPosition) {
        this.delegateToRenderer("changes", () =>
            this.useRendererChangeElementPosition(element, parentElement, newPosition)
        );
    }

    /**
     * Remove the given element from the tree of elements.
     * @param {typeof ElementType} element
     */
    removeElement(element) {
        if (element.hooks && element.hooks.beforeDestroyed) {
            this.delegateToRenderer("beforeDestroyed", element.hooks.beforeDestroyed);
        }

        this.delegateToRenderer("changes", () => this.useRendererRemoveElement(element));

        if (element.hooks && element.hooks.onDestroyed) {
            this.delegateToRenderer("onDestroyed", element.hooks.onDestroyed);
        }
    }

    /**
     * Update events
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    updateEvents(element, newElement) {
        for (let event in element.events) {
            if (!newElement.events[event]) {
                this.delegateToRenderer("changes", () =>
                    this.useRendererRemoveEvent(event, element.instance)
                );
            }
        }

        for (let event in newElement.events) {
            this.delegateToRenderer("changes", () =>
                this.useRendererAddEvent(event, newElement.events[event], element.instance)
            );
        }
    }

    /**
     * Update attributes
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    updateAttributes(element, newElement) {
        for (let attr in element.attributes) {
            if (newElement.attributes[attr] === undefined) {
                this.delegateToRenderer("changes", () =>
                    this.useRendererRemoveAttribute(attr, element.instance)
                );
            }
        }

        for (let attr in newElement.attributes) {
            if (newElement.attributes[attr] !== element.attributes[attr]) {
                this.delegateToRenderer("changes", () =>
                    this.useRendererSetAttribute(attr, newElement.attributes[attr], element)
                );
            }
        }
    }

    /**
     * Update children
     * @param {Array<typeof ElementType>} elementChildren
     * @param {Array<typeof ElementType>} newElementChildren
     */
    updateEqualChildren(elementChildren, newElementChildren) {
        for (let i = 0; i < elementChildren.length; i++) {
            this.updateElement(elementChildren[i], newElementChildren[i]);
        }
    }

    /**
     * Update children
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    updateChildren(element, newElement) {
        for (let i in element.children) {
            if (!this.useRendererItemInTree(element.children[i])) {
                this.replaceElement(element, newElement);
                return;
            }
        }

        if (element.map && newElement.map) {
            for (let key in element.map) {
                if (!newElement.map[key]) {
                    this.removeElement(element.children[element.map[key].index]);
                    delete element.map[key];
                }
            }

            for (let key in element.map) {
                this.updateElement(
                    element.children[element.map[key].index],
                    newElement.children[newElement.map[key].index]
                );
            }

            for (let key in newElement.map) {
                if (!element.map[key]) {
                    element.map[key] = {
                        key,
                        element: newElement.map[key].element,
                        index: Object.keys(element.map).length,
                    };
                }
            }

            for (let key in element.map) {
                if (element.map[key].index !== newElement.map[key].index) {
                    this.changeElementPosition(
                        element.children[element.map[key].index],
                        newElement.children[newElement.map[key].index],
                        newElement.map[key].index
                    );
                }
            }
        } else {
            if (element.children.length == newElement.children.length) {
                this.updateEqualChildren(element.children, newElement.children);
            } else if (element.children.length > newElement.children.length) {
                while (element.children.length > newElement.children.length) {
                    this.removeElement(element.children.pop());
                }
                this.updateEqualChildren(
                    element.children.slice(0, newElement.children.length),
                    newElement.children
                );
            } else {
                for (let i = element.children.length; i < newElement.children.length; i++) {
                    this.addElement(newElement.children[i], element);
                }

                this.updateEqualChildren(
                    element.children,
                    newElement.children.slice(0, element.children.length)
                );
            }
        }
    }

    /**
     * Update the current element style.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    updateStyle(element, newElement) {
        this.delegateToRenderer("changes", () => this.useRendererUpdateStyle(element, newElement));
    }

    /**
     * Update the current element.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    updateElement(element, newElement) {
        const instance = element.instance;
        if (!instance) {
            throwError("Element not found, This error should not happen.");
        }

        if (element.flags && element.flags.forceRerender === true) {
            this.replaceElement(element, newElement);
        } else if (element.elementType !== newElement.elementType) {
            this.replaceElement(element, newElement);
        } else if (element.elementType === "#text" && newElement.elementType === "#text") {
            if (element.children !== newElement.children) {
                this.useRendererUpdateText(element, newElement);
            }
        } else {
            this.updateEvents(element, newElement);
            this.updateAttributes(element, newElement);
            this.updateStyle(element, newElement);
            this.updateChildren(element, newElement);
        }

        newElement.instance = instance;
    }

    /**
     * Assign unique identifier to the element
     * @param {typeof ElementType} element
     * @param {typeof ElementType} parentElement
     * @param {number} index
     */
    assignUid(element, parentElement, index = 0) {
        let uid = parentElement ? parentElement.uid : "";

        function convert(uid) {
            return [...uid]
                .map((char, i) => {
                    return ((n) => {
                        return String.fromCharCode((n % 25) + 97);
                    })(char == "-" ? i : char.charCodeAt());
                })
                .join("");
        }

        element.uid = `${uid}${convert(`-${index}`)}`;

        if (Array.isArray(element.children)) {
            element.children.forEach((child, childIndex) => {
                this.assignUid(child, element, childIndex);
            });
        }
    }

    /**
     * Register element into the reference store.
     * @param {typeof ElementType} element
     */
    setInstanceReference(element) {
        if (element.hooks && typeof element.hooks.onRef === "function") {
            const ref = element.hooks.onRef(element.instance);

            if (typeof ref === "string") {
                this.stateManager.setRef(ref, element.instance);
            }
        }

        if (Array.isArray(element.children))
            element.children.forEach((child) => this.setInstanceReference(child));
    }

    /**
     * Render the tree of elements.
     */
    render() {
        if (typeof this.app !== "function") throwError("App is not of type function");

        if (!this.root) throwError("No root was specified.");

        this.orchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_TREE);
        this.current = this.prepare(this.app());
        this.assignUid(this.current, undefined, 0);
        this.useRendererOnTreePrepared(this.current);

        this.orchestrator.changeState(RecursiveOrchestrator.states.COMMIT_INTO_DOM);
        this.useRendererRenderTree();

        this.orchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_CREATED);
        this.runPhase("onCreated");
        this.setInstanceReference(this.current);
        this.clean();

        this.orchestrator.changeState(RecursiveOrchestrator.states.FREE);
    }

    /**
     * Update the tree of elements
     */
    update() {
        this.orchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_TREE);
        const _new = this.prepare(this.app());
        this.assignUid(_new, undefined, 0);
        this.useRendererOnTreePrepared(_new);

        this.orchestrator.changeState(RecursiveOrchestrator.states.COMPUTE_DIFF);
        this.updateElement(this.current, _new);
        this.current = _new;

        this.orchestrator.changeState(RecursiveOrchestrator.states.EXEC_BEFORE_DESTROYED);
        this.runPhase("beforeDestroyed");

        this.orchestrator.changeState(RecursiveOrchestrator.states.COMMIT_INTO_DOM);
        this.runPhase("changes");

        this.orchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_DESTROYED);
        this.runPhase("onDestroyed");

        this.orchestrator.changeState(RecursiveOrchestrator.states.EXEC_ON_UPDATED);
        this.runPhase("onUpdated");

        this.orchestrator.changeState(RecursiveOrchestrator.states.CLEAN_STATES);
        this.setInstanceReference(this.current);
        this.clean();
    }

    /**
     * Perform store cleaning and renderer specific operations.
     */
    clean() {
        this.stateManager.clear();
        this.phases = {
            onCreated: [],
            onUpdated: [],
            beforeDestroyed: [],
            onDestroyed: [],
            changes: [],
        };
        this.useRendererClean();
    }

    /**
     * Use the renderer to update style
     * @param {typeof ElementType} textElement
     * @param {typeof ElementType} newTextElement
     */
    useRendererUpdateStyle(textElement, newTextElement) {
        throwError("Renderer has no method updateStyle.");
    }

    /**
     * Use the renderer to update plain text
     * @param {typeof ElementType} textElement
     * @param {typeof ElementType} newTextElement
     */
    useRendererUpdateText(textElement, newTextElement) {
        throwError("Renderer has no method updateText.");
    }

    /**
     * Perform renderer specific cleaning.
     */
    useRendererClean() {
        throwError("Renderer has no method clean.");
    }

    /**
     * Executed when the tree has been prepared
     * @param {tyepof ElementType} tree
     */
    useRendererOnTreePrepared(tree) {
        throwError("Renderer has no method onTreePrepared.");
    }

    /**
     * Remove an attribute
     * @param {string} attribute
     * @param {any} instance
     */
    useRendererRemoveAttribute(attribute, instance) {
        throwError("Renderer has no method RemoveAttribute.");
    }

    /**
     * Set an attribute
     * @param {string} attribute
     * @param {any} value
     * @param {typeof ElementType} element
     */
    useRendererSetAttribute(attribute, value, element) {
        throwError("Renderer has no method SetAttribute.");
    }

    /**
     * Check if the children are in the tree of elements.
     * @param {typeof ElementType} element
     */
    useRendererItemInTree(element) {
        throwError("Renderer has no method itemInTree.");
    }

    /**
     * Use the renderer to remove an event
     * @param {string} eventName
     * @param {any} instance
     */
    useRendererRemoveEvent(eventName, instance) {
        throwError("Renderer has no method RemoveEvent.");
    }

    /**
     * Use the renderer to remove an event
     * @param {string} eventName
     * @param {function} callback
     * @param {any} instance
     */
    useRendererAddEvent(eventName, callback, instance) {
        throwError("Renderer has no method AddEvent.");
    }

    /**
     * Render the application tree.
     */
    useRendererRenderTree() {
        throwError("Renderer has no method renderTree.");
    }

    /**
     * Use renderer to Change the position of the given element.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} parentElement
     * @param {number} newPosition
     */
    useRendererChangeElementPosition(element, parentElement, newPosition) {
        throwError("Renderer has no method useRendererChangeElementPosition.");
    }

    /**
     * Remove the given element from the tree of elements.
     * @param {typeof ElementType} element
     */
    useRendererRemoveElement(element) {
        throwError("Renderer has no method useRendererRemoveElement");
    }

    /**
     * Use the renderer to append the given element into the provided parent element.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} parentElement
     */
    useRendererAddElement(element, parentElement) {
        throwError("Renderer has no method useRendererAddElement.");
    }

    /**
     * Use the renderer to replace the given element by the new one.
     * @param {typeof ElementType} element
     * @param {typeof ElementType} newElement
     */
    useRendererReplaceElement(element, newElement) {
        throwError("Renderer has no method useRendererReplaceElement.");
    }

    /**
     * Return if the given attribute is valid for this renderer
     * @param {string} attribute to be checked
     * @return {boolean}
     */
    useRendererIsAttribute(attribute) {
        throwError("Renderer has no method isAttribute.");
    }

    /**
     * Return if the given event is valid for this renderer
     * @param {string} event to be checked
     * @return {boolean}
     */
    useRendererIsEvent(event) {
        throwError("Renderer has no method isEvent.");
    }

    /**
     * Create a bare-bone native instance of the provided element.
     * @param {typeof ElementType} element
     * @return native element
     */
    useRendererCreateInstance(element) {
        throwError("Renderer has no method createInstance.");
    }

    /**
     * Inject attributes into the created instance;
     * @param {typeof ElementType} element
     * @param {any} instance
     */
    useRendererInjectAttributes(element, instance) {
        throwError("Renderer has no method injectAttributes.");
    }

    /**
     * Inject events into the created instance;
     * @param {typeof ElementType} element
     * @param {any} instance
     */
    useRendererInjectEvents(element, instance) {
        throwError("Renderer has no method injectEvents.");
    }

    /**
     * Inject children into the created instance;
     * @param {typeof ElementType} element
     * @param {any} instance
     */
    useRendererInjectChildren(element, instance) {
        throwError("Renderer has no method injectChildren.");
    }
}

export default RecursiveRenderer;
