const { RecursiveConsole } = require("../console");
const { RecursiveContext } = require("../context");

const { createElement } = require("./element");
const { isFlag } = require("./flags");
const { isHook } = require("./hooks");
const { isValidChild, makeDiffList, isRecursiveElement } = require("./utility");

const {
    RENDERER_PHASE_ON_CREATED,
    RENDERER_PHASE_ON_UPDATED,
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RECURSIVE_ELEMENT_SYMBOL,
    ELEMENT_TYPE_FRAGMENT,
    ELEMENT_TYPE_RAW,
    ELEMENT_TYPE_TEXT_NODE,
} = require("../constants");

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
        const _instance =
            element.elementType === ELEMENT_TYPE_RAW
                ? this.useRendererCreateRawContainer(element)
                : this.useRendererCreateInstance(element);

        if (element.attributes) {
            for (let attr in element.attributes) {
                this.useRendererInjectAttribute(attr, element.attributes[attr], _instance);
            }
        }

        if (element.style) {
            this.useRendererInjectStyle(element.style, _instance);
        }

        if (element.events) {
            for (let ev in element.events) {
                this.useRendererInjectEvent(ev, element.events[ev], _instance);
            }
        }

        /**
         * We do not inject children in case of a raw type element.
         * It is the responsibility of useRendererCreateRawContainer
         */
        if (Array.isArray(element.children) && element.elementType !== ELEMENT_TYPE_RAW) {
            for (let child of element.children) {
                this.useRendererInjectChild(child, _instance);
            }
        }

        element.instance = _instance;

        this.onElementCreated(element);

        return _instance;
    }

    replaceElement(element, newElement) {
        this.onBeforeElementDestroyed(element);

        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererReplaceElement(element, newElement)
        );

        this.onElementDestroyed(element);

        newElement.instance = element.instance;
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
        this.onBeforeElementDestroyed(element);

        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            this.useRendererRemoveElement(element);
        });

        this.onElementDestroyed(element);
    }

    updateEvents(element, newElement) {
        const combined = makeDiffList(element.events, newElement.events);

        for (let key in combined.toUpdate) {
            this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                this.useRendererUpdateEvent(key, newElement.events[key], element);
            });
        }

        for (let key in combined.toAdd) {
            this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                this.useRendererAddEvent(key, newElement.events[key], element);
            });
        }

        for (let key in combined.toRemove) {
            this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                this.useRendererRemoveEvent(key, element.instance);
            });
        }

        return Object.keys(combined.toRemove).length > 0 || Object.keys(combined.toAdd).length > 0;
    }

    updateAttributes(element, newElement) {
        const combined = makeDiffList(element.attributes, newElement.attributes);

        for (let key in combined.toUpdate) {
            this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                this.useRendererSetAttribute(key, combined.toUpdate[key], element);
            });
        }

        for (let key in combined.toAdd) {
            this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                this.useRendererSetAttribute(key, combined.toAdd[key], element);
            });
        }

        for (let key in combined.toRemove) {
            this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
                this.useRendererRemoveAttribute(key, element.instance);
            });
        }

        return (
            Object.keys(combined.toRemove).length > 0 ||
            Object.keys(combined.toAdd).length > 0 ||
            Object.keys(combined.toUpdate).length > 0
        );
    }

    updateChildren(element, newElement) {
        const updateEqualChildrenRecursively = (elementChildren, newElementChildren) => {
            for (let i = 0; i < elementChildren.length; i++) {
                this.updateElement(elementChildren[i], newElementChildren[i]);
            }
        };

        /**
         * We check if all elements are in the tree.
         * If one child is missing,
         * we correct the tree by directly replacing the current one with the new one.
         */
        for (let i in element.children) {
            if (!this.useRendererItemInTree(element.children[i])) {
                this.replaceElement(element, newElement);
                return;
            }
        }

        if (element.map && newElement.map) {
            /**
             * We start by removing the excess elements
             */
            for (let key in element.map) {
                if (newElement.map[key] == undefined) {
                    this.removeElement(element.children[element.map[key]]);
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
                    this.addElement(newChild, element, newPosition);
                } else {
                    /**
                     * If the element already exits,
                     * we change its position if it needs to be changed.
                     */
                    const oldPosition = element.map[key];
                    const oldChild = element.children[oldPosition];

                    if (this.useRendererGetElementPosition(oldChild) != newPosition) {
                        this.changeElementPosition(oldChild, newPosition);
                    }

                    this.updateElement(oldChild, newChild);
                }
            }
        } else {
            if (element.children.length == newElement.children.length) {
                /**
                 * If both elements have the same number of children
                 * we diff them directly
                 */
                updateEqualChildrenRecursively(element.children, newElement.children);
            } else if (element.children.length > newElement.children.length) {
                /**
                 * If the currently rendered element have more children
                 * we remove elements till their numbers are equal.
                 */
                while (element.children.length > newElement.children.length) {
                    this.removeElement(element.children.pop());
                }

                updateEqualChildrenRecursively(
                    element.children.slice(0, newElement.children.length),
                    newElement.children
                );
            } else {
                /**
                 * New element have more children
                 * We add the excess and update the rest.
                 */
                for (let i = element.children.length; i < newElement.children.length; i++) {
                    this.addElement(newElement.children[i], element);
                }

                updateEqualChildrenRecursively(
                    element.children,
                    newElement.children.slice(0, element.children.length)
                );
            }
        }
    }

    updateStyle(element, newElement) {
        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererUpdateStyle(element, newElement)
        );
    }

    updateElement(element, newElement) {
        const instance = element.instance;

        if (!instance) {
            RecursiveConsole.error("Recursive Renderer : Instance of the element not found", [
                "This error can happen when you manipulate the dom directly.",
            ]);
        }

        if (element.flags && element.flags.forceRerender === true) {
            /**
             * The element requires to be rerendered
             * or/and replaced by the new Element
             */
            this.replaceElement(element, newElement);
        } else if (element.elementType !== newElement.elementType) {
            /**
             * Elements does not have the same type.
             * Just replace the old with the new one.
             */
            this.replaceElement(element, newElement);
        } else if (
            element.elementType === ELEMENT_TYPE_TEXT_NODE &&
            newElement.elementType === ELEMENT_TYPE_TEXT_NODE
        ) {
            /**
             * Both element are text nodes
             * we compare their children.
             */
            if (element.children !== newElement.children) {
                this.useRendererUpdateText(element, newElement);
            }
        } else {
            /**
             * Both elements have the same type.
             * We perform the classic routine of recursively
             * comparing attributes, events and children.
             */

            /**
             * A boolean indicating if at least a change in events happened.
             */
            const eventsDidChange = this.updateEvents(element, newElement);
            /**
             * A boolean indicating if at least a change in attributes happened.
             * Performing the update twice
             * Because some attributes should be updated before others,
             * we don't know the specific order.
             * If it is not updated on the first run,
             * it will surely be updated on the second one.
             * This operation could costly on some platforms,
             * but it surely reduce performance.
             *
             * This is but a temporary fix.
             * The real checking should be performed within
             * `recursive-web`.
             */
            const attributesDidChange =
                this.updateAttributes(element, newElement) &&
                this.updateAttributes(element, newElement);

            this.updateStyle(element, newElement);

            if (element.elementType === ELEMENT_TYPE_RAW) {
                /**
                 * We have two raw elements,
                 * the implemented renderer should resolve the issue.
                 */
                this.useRendererUpdateRawContainersAgainstEachOthers(element, newElement);
            } else {
                this.updateChildren(element, newElement);
            }

            if (eventsDidChange || attributesDidChange) {
                this.onElementUpdated(element);
            }
        }

        newElement.instance = instance;
    }

    setInstanceReference(element) {
        if (element.hooks && typeof element.hooks.onRef === "function") {
            const ref = element.hooks.onRef(element.instance);

            if (typeof ref === "string") {
                this.stateManager.setRef(ref, element.instance);
            }
        }

        if (Array.isArray(element.children))
            element.children.forEach((child) => {
                this.setInstanceReference(child);
            });
    }

    render() {
        if (typeof this.app !== "function") {
            RecursiveConsole.error("App is not of type function.");
        }

        if (!this.root) {
            RecursiveConsole.error("No root was specified.");
        }

        this.orchestrator.setStep.computeTree();

        const initialRender = this.app();

        if (!isRecursiveElement(initialRender)) {
            RecursiveConsole.error("Root element is not of type RecursiveElement.", [
                "Use createRecursiveElement to create a valid element.",
            ]);
        }

        this.current = this.prepareElement(initialRender, "0", null);

        this.useRendererOnTreePrepared(this.current);

        this.orchestrator.setStep.commit();
        this.useRendererRenderTree();

        this.orchestrator.setStep.execOnCreated();
        this.runPhase(RENDERER_PHASE_ON_CREATED);
        this.setInstanceReference(this.current);
        this.clean();

        this.orchestrator.setStep.free();
    }

    update() {
        this.orchestrator.setStep.computeTree();

        let _new;

        _new = this.prepareElement(this.app(), "0", null);

        if (_new.$$_RecursiveSymbol != RECURSIVE_ELEMENT_SYMBOL) {
            RecursiveConsole.error("Root element is not of type RecursiveElement.", [
                "Use createRecursiveElement to create a valid element.",
            ]);
        }

        this.useRendererOnTreePrepared(_new);

        this.orchestrator.setStep.computeDiff();
        this.updateElement(this.current, _new);
        this.current = _new;

        this.orchestrator.setStep.execBeforeDestroyed();
        this.runPhase(RENDERER_PHASE_BEFORE_DESTROYED);

        this.orchestrator.setStep.commit();
        this.runPhase(RENDERER_PHASE_CHANGES);

        this.orchestrator.setStep.execOnDestroyed();
        this.runPhase(RENDERER_PHASE_ON_DESTROYED);

        this.orchestrator.setStep.execOnUpdated();
        this.runPhase(RENDERER_PHASE_ON_UPDATED);

        this.orchestrator.setStep.execOnCreated();
        this.runPhase(RENDERER_PHASE_ON_CREATED);

        this.orchestrator.setStep.cleanStates();
        this.setInstanceReference(this.current);
        this.clean();
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
                        if (isValidChild(_child)) {
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
