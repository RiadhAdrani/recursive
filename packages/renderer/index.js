const { RecursiveConsole } = require("../console");
const { RecursiveContext } = require("../context");
const { RecursiveOrchestrator } = require("../orchestrator/");
const { RecursiveState } = require("../state/");

const addElement = require("./src/addElement");
const changeElementPosition = require("./src/changeElementPosition");
const removeElement = require("./src/removeElement");
const render = require("./src/render");
const renderInstance = require("./src/renderInstance");
const replaceElement = require("./src/replaceElement");
const setInstanceReference = require("./src/setInstanceReference");
const update = require("./src/update");
const updateAttributes = require("./src/updateAttributes");
const updateChildrenEqual = require("./src/updateChildren.Equal");
const updateChildren = require("./src/updateChildren");
const updateElement = require("./src/updateElement");
const updateEvents = require("./src/updateEvent");
const {
    RENDERER_PHASE_ON_CREATED,
    RENDERER_PHASE_ON_UPDATED,
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_CHANGES,
} = require("../constants");

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
     * @param {import("../../lib.js").App} app function returning the tree of elements
     * @param {any} root
     */
    constructor(app, root) {
        /**
         * @type {RecursiveOrchestrator}
         */
        this.orchestrator = undefined;

        /**
         * @type {RecursiveState}
         */
        this.stateManager = undefined;

        /**
         * @type {RecursiveContext}
         */
        this.contextManager = new RecursiveContext();

        this.app = app;
        this.root = root;
        this.current = undefined;
        this.phases = {
            [RENDERER_PHASE_ON_CREATED]: [],
            [RENDERER_PHASE_ON_UPDATED]: [],
            [RENDERER_PHASE_BEFORE_DESTROYED]: [],
            [RENDERER_PHASE_ON_DESTROYED]: [],
            [RENDERER_PHASE_CHANGES]: [],
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
     * Delegate the call of the `onUpdated` hook to the renderer
     * @param {import("../../lib.js").RecursiveElement} element
     */
    onElementUpdated(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_ON_UPDATED, element.hooks.onUpdated);
    }

    /**
     * Delegate the call of the `onCreated` hook to the renderer
     * @param {import("../../lib.js").RecursiveElement} element
     */
    onElementCreated(element) {
        if (element.hooks && element.hooks.onCreated)
            this.delegateToRenderer(RENDERER_PHASE_ON_CREATED, () =>
                element.hooks.onCreated(element.instance)
            );
    }

    /**
     * Delegate the call of the `beforeDestroyed` hook to the renderer
     * @param {import("../../lib.js").RecursiveElement} element
     */
    onBeforeElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_BEFORE_DESTROYED, element.hooks.beforeDestroyed);
    }

    /**
     * Delegate the call of the `onDestroyed` hook to the renderer
     * @param {import("../../lib.js").RecursiveElement} element
     */
    onElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_ON_DESTROYED, element.hooks.onDestroyed);
    }

    /**
     * Inject the different attributes, events and children into the created instance;
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {any} instance
     */
    renderInstance(element) {
        return renderInstance(element, this);
    }

    /**
     * Replace the given element by the new one.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    replaceElement(element, newElement) {
        replaceElement(element, newElement, this);
    }

    /**
     * Append the given element into the provided parent element.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} parentElement
     */
    addElement(element, parentElement) {
        addElement(element, parentElement, this);
    }

    /**
     * Change the position of the given element.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    changeElementPosition(element, parentElement, newPosition) {
        changeElementPosition(element, parentElement, newPosition, this);
    }

    /**
     * Remove the given element from the tree of elements.
     * @param {import("../../lib.js").RecursiveElement} element
     */
    removeElement(element) {
        removeElement(element, this);
    }

    /**
     * Update events
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    updateEvents(element, newElement) {
        updateEvents(element, newElement, this);
    }

    /**
     * Update attributes
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    updateAttributes(element, newElement) {
        updateAttributes(element, newElement, this);
    }

    /**
     * Update children
     * @param {Array<import("../../lib.js").RecursiveElement>} elementChildren
     * @param {Array<import("../../lib.js").RecursiveElement>} newElementChildren
     */
    updateEqualChildren(elementChildren, newElementChildren) {
        updateChildrenEqual(elementChildren, newElementChildren, this);
    }

    /**
     * Update children
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    updateChildren(element, newElement) {
        updateChildren(element, newElement, this);
    }

    /**
     * Update the current element style.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    updateStyle(element, newElement) {
        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererUpdateStyle(element, newElement)
        );
    }

    /**
     * Update the current element.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    updateElement(element, newElement) {
        updateElement(element, newElement, this);
    }

    /**
     * Register element into the reference store.
     * @param {import("../../lib.js").RecursiveElement} element
     */
    setInstanceReference(element) {
        setInstanceReference(element, this);
    }

    /**
     * Render the tree of elements.
     */
    render() {
        render(this);
    }

    /**
     * Update the tree of elements
     */
    update() {
        update(this);
    }

    /**
     * Perform store cleaning and renderer specific operations.
     */
    clean() {
        this.stateManager.clear();
        this.phases = {
            [RENDERER_PHASE_ON_CREATED]: [],
            [RENDERER_PHASE_ON_UPDATED]: [],
            [RENDERER_PHASE_BEFORE_DESTROYED]: [],
            [RENDERER_PHASE_ON_DESTROYED]: [],
            [RENDERER_PHASE_CHANGES]: [],
        };
        this.useRendererClean();
    }

    /**
     * Use the renderer to update style
     * @param {import("../../lib.js").RecursiveElement} textElement
     * @param {import("../../lib.js").RecursiveElement} newTextElement
     */
    useRendererUpdateStyle(textElement, newTextElement) {
        RecursiveConsole.error("Renderer has no method updateStyle.");
    }

    /**
     * Use the renderer to update plain text
     * @param {import("../../lib.js").RecursiveElement} textElement
     * @param {import("../../lib.js").RecursiveElement} newTextElement
     */
    useRendererUpdateText(textElement, newTextElement) {
        RecursiveConsole.error("Renderer has no method updateText.");
    }

    /**
     * Perform renderer specific cleaning.
     */
    useRendererClean() {
        RecursiveConsole.error("Renderer has no method clean.");
    }

    /**
     * Executed when the tree has been prepared
     * @param {tyepof ElementType} tree
     */
    useRendererOnTreePrepared(tree) {
        RecursiveConsole.error("Renderer has no method onTreePrepared.");
    }

    /**
     * Remove an attribute
     * @param {string} attribute
     * @param {any} instance
     */
    useRendererRemoveAttribute(attribute, instance) {
        RecursiveConsole.error("Renderer has no method RemoveAttribute.");
    }

    /**
     * Set an attribute
     * @param {string} attribute
     * @param {any} value
     * @param {import("../../lib.js").RecursiveElement} element
     */
    useRendererSetAttribute(attribute, value, element) {
        RecursiveConsole.error("Renderer has no method SetAttribute.");
    }

    /**
     * Check if the children are in the tree of elements.
     * @param {import("../../lib.js").RecursiveElement} element
     */
    useRendererItemInTree(element) {
        RecursiveConsole.error("Renderer has no method itemInTree.");
    }

    /**
     * Use the renderer to remove an event
     * @param {string} eventName
     * @param {any} instance
     */
    useRendererRemoveEvent(eventName, instance) {
        RecursiveConsole.error("Renderer has no method RemoveEvent.");
    }

    /**
     * Use the renderer to remove an event
     * @param {string} eventName
     * @param {function} callback
     * @param {any} element
     */
    useRendererAddEvent(eventName, callback, element) {
        RecursiveConsole.error("Renderer has no method AddEvent.");
    }

    /**
     * Render the application tree.
     */
    useRendererRenderTree() {
        RecursiveConsole.error("Renderer has no method renderTree.");
    }

    /**
     * Use renderer to Change the position of the given element.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} parentElement
     * @param {number} newPosition
     */
    useRendererChangeElementPosition(element, parentElement, newPosition) {
        RecursiveConsole.error("Renderer has no method useRendererChangeElementPosition.");
    }

    /**
     * Remove the given element from the tree of elements.
     * @param {import("../../lib.js").RecursiveElement} element
     */
    useRendererRemoveElement(element) {
        RecursiveConsole.error("Renderer has no method useRendererRemoveElement");
    }

    /**
     * Use the renderer to append the given element into the provided parent element.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} parentElement
     */
    useRendererAddElement(element, parentElement) {
        RecursiveConsole.error("Renderer has no method useRendererAddElement.");
    }

    /**
     * Use the renderer to replace the given element by the new one.
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {import("../../lib.js").RecursiveElement} newElement
     */
    useRendererReplaceElement(element, newElement) {
        RecursiveConsole.error("Renderer has no method useRendererReplaceElement.");
    }

    /**
     * Return if the given attribute is valid for this renderer
     * @param {string} attribute to be checked
     * @return {boolean}
     */
    useRendererIsAttribute(attribute) {
        RecursiveConsole.error("Renderer has no method isAttribute.");
    }

    /**
     * Return if the given event is valid for this renderer
     * @param {string} event to be checked
     * @return {boolean}
     */
    useRendererIsEvent(event) {
        RecursiveConsole.error("Renderer has no method isEvent.");
    }

    /**
     * Create a bare-bone native instance of the provided element.
     * @param {import("../../lib.js").RecursiveElement} element
     * @return native element
     */
    useRendererCreateInstance(element) {
        RecursiveConsole.error("Renderer has no method createInstance.");
    }

    /**
     * Inject attributes into the created instance;
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {any} instance
     */
    useRendererInjectAttributes(element, instance) {
        RecursiveConsole.error("Renderer has no method injectAttributes.");
    }

    /**
     * Inject events into the created instance;
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {any} instance
     */
    useRendererInjectEvents(element, instance) {
        RecursiveConsole.error("Renderer has no method injectEvents.");
    }

    /**
     * Inject children into the created instance;
     * @param {import("../../lib.js").RecursiveElement} element
     * @param {any} instance
     */
    useRendererInjectChildren(element, instance) {
        RecursiveConsole.error("Renderer has no method injectChildren.");
    }
}

module.exports = { RecursiveRenderer };
