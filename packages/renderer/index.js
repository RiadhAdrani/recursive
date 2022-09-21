const { RecursiveConsole } = require("../console");
const { RecursiveContext } = require("../context");

const { createElement } = require("./element");
const changeElementPosition = require("./src/changeElementPosition");
const removeElement = require("./src/removeElement");
const render = require("./src/render");
const renderInstance = require("./src/renderInstance");
const replaceElement = require("./src/replaceElement");
const setInstanceReference = require("./src/setInstanceReference");
const update = require("./src/update");
const updateAttributes = require("./src/updateAttributes");
const updateChildren = require("./src/updateChildren");
const updateElement = require("./src/updateElement");
const updateEvents = require("./src/updateEvent");
const {
    RENDERER_PHASE_ON_CREATED,
    RENDERER_PHASE_ON_UPDATED,
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RECURSIVE_ELEMENT_SYMBOL,
} = require("../constants");
const isRecursiveElement = require("./src/isRecursiveElement");

class RecursiveRenderer {
    constructor(app, root, bootstrapper) {
        this.bootstrapper = bootstrapper;

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

    get orchestrator() {
        return this.bootstrapper.orchestrator;
    }

    get stateManager() {
        return this.bootstrapper.stateManager;
    }

    createElement(elementType, props) {
        return {
            ...props,
            elementType,
            $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
        };
    }

    delegateToRenderer(phase, callback) {
        if (!this.phases[phase] || typeof callback !== "function") return;

        this.phases[phase].push(callback);
    }

    runPhase(phase) {
        if (!this.phases || !Array.isArray(this.phases[phase])) return;

        this.phases[phase].forEach((action) => {
            if (typeof action === "function") action();
        });
    }

    onElementUpdated(element) {
        if (element.hooks && element.hooks.onUpdated)
            this.delegateToRenderer(RENDERER_PHASE_ON_UPDATED, () =>
                element.hooks.onUpdated(element.instance)
            );
    }

    onElementCreated(element) {
        if (element.hooks && element.hooks.onCreated) {
            this.delegateToRenderer(RENDERER_PHASE_ON_CREATED, () =>
                element.hooks.onCreated(element.instance)
            );
        }
    }

    onBeforeElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_BEFORE_DESTROYED, element.hooks.beforeDestroyed);
    }

    onElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_ON_DESTROYED, element.hooks.onDestroyed);
    }

    renderInstance(element) {
        return renderInstance(element, this);
    }

    replaceElement(element, newElement) {
        replaceElement(element, newElement, this);
    }

    addElement(element, parentElement, index) {
        if (!isRecursiveElement(element)) return;

        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererAddElement(element, parentElement, index)
        );

        this.onElementCreated(element);
    }

    changeElementPosition(element, newPosition) {
        changeElementPosition(element, newPosition, this);
    }

    removeElement(element) {
        removeElement(element, this);
    }

    updateEvents(element, newElement) {
        return updateEvents(element, newElement, this);
    }

    updateAttributes(element, newElement) {
        return updateAttributes(element, newElement, this);
    }

    updateChildren(element, newElement) {
        updateChildren(element, newElement, this);
    }

    updateStyle(element, newElement) {
        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererUpdateStyle(element, newElement)
        );
    }

    updateElement(element, newElement) {
        updateElement(element, newElement, this);
    }

    setInstanceReference(element) {
        setInstanceReference(element, this);
    }

    render() {
        render(this);
    }

    update() {
        update(this);
    }

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

    useRendererUpdateStyle(element, newElement) {
        RecursiveConsole.error("Renderer has no method updateStyle.");
    }

    useRendererUpdateText(textElement, newTextElement) {
        RecursiveConsole.error("Renderer has no method updateText.");
    }

    useRendererClean() {
        RecursiveConsole.error("Renderer has no method clean.");
    }

    useRendererOnTreePrepared(tree) {
        RecursiveConsole.error("Renderer has no method onTreePrepared.");
    }

    useRendererRemoveAttribute(attribute, instance) {
        RecursiveConsole.error("Renderer has no method RemoveAttribute.");
    }

    useRendererSetAttribute(attribute, value, element) {
        RecursiveConsole.error("Renderer has no method SetAttribute.");
    }

    useRendererItemInTree(element) {
        RecursiveConsole.error("Renderer has no method itemInTree.");
    }

    useRendererRemoveEvent(eventName, instance) {
        RecursiveConsole.error("Renderer has no method RemoveEvent.");
    }

    useRendererAddEvent(eventName, callback, element) {
        RecursiveConsole.error("Renderer has no method AddEvent.");
    }

    useRendererRenderTree() {
        RecursiveConsole.error("Renderer has no method renderTree.");
    }

    useRendererChangeElementPosition(element, parentElement, newPosition) {
        RecursiveConsole.error("Renderer has no method useRendererChangeElementPosition.");
    }

    useRendererGetElementPosition(element) {
        RecursiveConsole.error("Renderer has no method useRendererGetElementPosition.");
    }

    useRendererRemoveElement(element) {
        RecursiveConsole.error("Renderer has no method useRendererRemoveElement");
    }

    useRendererAddElement(element, parentElement, index) {
        RecursiveConsole.error("Renderer has no method useRendererAddElement.");
    }

    useRendererReplaceElement(element, newElement) {
        RecursiveConsole.error("Renderer has no method useRendererReplaceElement.");
    }

    useRendererIsAttribute(attribute) {
        RecursiveConsole.error("Renderer has no method useRendererIsAttribute.");
    }

    useRendererIsEvent(event) {
        RecursiveConsole.error("Renderer has no method useRendererIsEvent.");
    }

    useRendererCreateInstance(element) {
        RecursiveConsole.error("Renderer has no method useRendererCreateInstance.");
    }

    useRendererInjectAttribute(attributeName, value, instance) {
        RecursiveConsole.error("Renderer has no method useRendererInjectAttribute.");
    }

    useRendererInjectStyle(style, instance) {
        RecursiveConsole.error("Renderer has no method useRendererInjectStyle.");
    }

    useRendererInjectEvent(event, callback, instance) {
        RecursiveConsole.error("Renderer has no method useRendererInjectEvent.");
    }

    useRendererUpdateEvent(event, callback, element) {
        RecursiveConsole.error("Renderer has no method useRendererUpdateEvent.");
    }

    useRendererInjectChild(child, instance) {
        RecursiveConsole.error("Renderer has no method useRendererInjectChild.");
    }

    useRendererCreateRawContainer(element) {
        RecursiveConsole.error("Renderer has no method useRendererCreateRawContainer.");
    }

    useRendererUpdateRawContainersAgainstEachOthers(element, newElement) {
        RecursiveConsole.error(
            "Renderer has no method useRendererUpdateRawContainersAgainstEachOthers."
        );
    }
}

module.exports = { RecursiveRenderer, createElement };
