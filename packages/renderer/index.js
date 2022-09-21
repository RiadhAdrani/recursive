const { RecursiveConsole } = require("../console");
const { RecursiveContext } = require("../context");

const { createElement } = require("./element");
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
const { isFlag } = require("./flags");
const { isHook } = require("./hooks");
const { checkChildIsValid } = require("./utility");

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
        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererChangeElementPosition(element, newPosition)
        );
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

    prepareElement(element, id, parent) {
        const _element = {};

        if (!element.$$_RecursiveSymbol || element.$$_RecursiveSymbol != RECURSIVE_ELEMENT_SYMBOL) {
            RecursiveConsole.error(
                "Recursive Renderer : Element does not have the RecursiveElement signature symbol.",
                ['You should create an element only using "createRecursiveElement" method.']
            );
            return false;
        }

        if (
            typeof element.elementType != "string" ||
            !element.elementType ||
            !element.elementType.toString().trim()
        ) {
            RecursiveConsole.error(
                'Recursive Renderer : "elementType" should not be empty or null.',
                [
                    "Element type should be of type string.",
                    "Make sure to provide a type for your element (ex: div in web).",
                ]
            );
            return false;
        }

        _element.$$_RecursiveSymbol = element.$$_RecursiveSymbol;
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
        _element.uid = id;
        _element.parent = parent;
        _element.indexInParent = parseInt(id.split("-").pop());

        for (let property in element) {
            if (property === "flags") {
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
                if (typeof element[property] != "function") {
                    RecursiveConsole.error(
                        `Recursive Renderer : Event "${property}" is not a function.`
                    );
                }
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

            if (!Array.isArray(element.children)) {
                element.children = [element.children];
            }

            element.children.forEach((child, index) => {
                const uid = _element.uid + "-" + index;

                const _child = this.prepareChild(child, uid, _element);

                if (_child) {
                    if (_child.elementType === ELEMENT_TYPE_FRAGMENT) {
                        _children.push(..._child.children);
                    } else {
                        if (checkChildIsValid(_child)) {
                            _children.push(_child);
                        }
                    }
                }
            });

            _element.children = _children;

            if (
                _element.elementType === ELEMENT_TYPE_RAW &&
                _element.children.some((child) => child.elementType != ELEMENT_TYPE_TEXT_NODE)
            ) {
                RecursiveConsole.warn(
                    "Recursive Renderer : " +
                        "You are using the raw element while one or more children are not of type string." +
                        " They will be converted to string."
                );
            }

            _element.map = this.prepareMap(_element.children);
        }

        return _element;
    }

    prepareChild(child, id, parent) {
        if ([null, undefined].includes(child)) return false;

        if (!child.elementType) {
            return {
                elementType: ELEMENT_TYPE_TEXT_NODE,
                $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
                children: child,
                instance: undefined,
            };
        } else {
            if (child.flags && child.flags.renderIf === false) {
                return false;
            } else {
                let _prepared = false;

                _prepared = this.prepareElement(child, id, parent);

                return _prepared;
            }
        }
    }

    prepareMap(children) {
        const map = {};

        let index = 0;

        for (let child of children) {
            if (["string", "number"].includes(typeof child.key)) {
                if (map[child.key] != undefined) {
                    RecursiveConsole.warn(
                        "Recursive Renderer : Duplicate keys detected. Each child should have a unique key."
                    );
                    return false;
                }
                map[child.key] = index;
            } else {
                return false;
            }

            index++;
        }

        return map;
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
