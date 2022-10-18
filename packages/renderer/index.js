const { hasProperty } = require("@riadh-adrani/utility-js");

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
        /**
         * Dev Note
         * ---
         *
         * For some reason, we cannot use it directly,
         * we need to import the type
         * to avoid circular dependency with webpack
         * @type {import("../app/index").RecursiveApp}
         */
        this.bootstrapper = bootstrapper;

        /**
         * @type {RecursiveContext}
         */
        this.contextManager = new RecursiveContext();

        /**
         * @type {() => import("../../lib").RecursiveElement}
         */
        this.app = app;

        /**
         * @type {import("../../lib").NativeElement}
         */
        this.root = root;

        /**
         * @type {import("../../lib").RecursiveElement}
         */
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

    /**
     * @param {string} elementType
     * @param {Map<string,any>} props
     * @returns {import("../../lib").BaseElement}
     */
    createElement(elementType, props) {
        return {
            ...props,
            elementType,
            $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
        };
    }

    /**
     * @param {string} phase
     * @param {() => void} callback
     */
    delegateToRenderer(phase, callback) {
        if (!this.phases[phase] || typeof callback !== "function") return;

        this.phases[phase].push(callback);
    }

    /**
     * @param {string} phase
     */
    runPhase(phase) {
        if (!this.phases || !Array.isArray(this.phases[phase])) return;

        this.phases[phase].forEach((action) => {
            if (typeof action === "function") action();
        });
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    onElementUpdated(element) {
        if (element.hooks && element.hooks.onUpdated)
            this.delegateToRenderer(RENDERER_PHASE_ON_UPDATED, () =>
                element.hooks.onUpdated(element.instance)
            );
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    onElementCreated(element) {
        if (element.hooks && element.hooks.onCreated) {
            this.delegateToRenderer(RENDERER_PHASE_ON_CREATED, () =>
                element.hooks.onCreated(element.instance)
            );
        }
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    onBeforeElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_BEFORE_DESTROYED, element.hooks.beforeDestroyed);
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    onElementDestroyed(element) {
        if (element.hooks)
            this.delegateToRenderer(RENDERER_PHASE_ON_DESTROYED, element.hooks.onDestroyed);
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
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

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} newElement
     */
    replaceElement(element, newElement) {
        this.onBeforeElementDestroyed(element);

        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererReplaceElement(element, newElement)
        );

        this.onElementDestroyed(element);

        newElement.instance = element.instance;
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     * @param {number}
     */
    addElement(element, parentElement, index) {
        if (!isRecursiveElement(element)) return;

        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererAddElement(element, parentElement, index)
        );

        this.onElementCreated(element);
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {number} newPosition
     */
    changeElementPosition(element, newPosition) {
        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererChangeElementPosition(element, newPosition)
        );
    }

    /**
     * @param {import("../../lib").RecursiveElement} element@param {*} element
     */
    removeElement(element) {
        this.onBeforeElementDestroyed(element);

        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () => {
            this.useRendererRemoveElement(element);
        });

        this.onElementDestroyed(element);
    }

    /**
     *
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     * @returns {boolean}
     */
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

    /**
     *
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     * @returns {boolean}
     */
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

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     */
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

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     */
    updateStyle(element, newElement) {
        this.delegateToRenderer(RENDERER_PHASE_CHANGES, () =>
            this.useRendererUpdateStyle(element, newElement)
        );
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     */
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

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
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

        this.current = this.prepareElementsTree();

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

        const newRender = this.prepareElementsTree();

        this.useRendererOnTreePrepared(newRender);

        this.orchestrator.setStep.computeDiff();
        this.updateElement(this.current, newRender);
        this.current = newRender;

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

    /**
     * @param {import("../../lib").BaseElement} element
     * @param {string} id
     * @param {import("../../lib").RecursiveElement | undefined} parent
     * @returns
     */
    prepareElement(element, id, parent) {
        if (hasProperty(element, "hooks") && typeof element.beforePrepared === "function") {
            element.hooks.beforePrepared(element);
        }

        const _element = {};

        if (!element.$$_RecursiveSymbol || element.$$_RecursiveSymbol != RECURSIVE_ELEMENT_SYMBOL) {
            RecursiveConsole.error(
                "Recursive Renderer : Element does not have the RecursiveElement signature symbol.",
                ["You should create an element only using createElement() method."]
            );
            return false;
        }

        if (
            typeof element.elementType != "string" ||
            !element.elementType ||
            !element.elementType.toString().trim()
        ) {
            RecursiveConsole.error(
                "Recursive Renderer : (elementType) should not be empty or null.",
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

        if (hasProperty(_element, "hooks") && typeof _element.hooks.onPrepared === "function") {
            _element.hooks.onPrepared(_element);
        }

        return _element;
    }

    /**
     * @param {any} child
     * @param {number} id
     * @param {import("../../lib").RecursiveElement} parent
     * @returns {import("../../lib").RecursiveElement}
     */
    prepareChild(child, id, parent) {
        if ([null, undefined].includes(child)) return false;

        if (!child.elementType) {
            return createElement(ELEMENT_TYPE_TEXT_NODE, { children: child });
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

    /**
     * @param {Array<import("../../lib").RecursiveElement>} children
     * @returns {Map<string,number>}
     */
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

    prepareElementsTree() {
        const tree = this.prepareElement(this.app(), "0", null);

        if (!isRecursiveElement(tree)) {
            RecursiveConsole.error("Root element is not of type RecursiveElement.", [
                "Use createRecursiveElement to create a valid element.",
            ]);
        }

        return tree;
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} newElement
     */
    useRendererUpdateStyle() {
        RecursiveConsole.error("Renderer has no method updateStyle.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} textElement
     * @param {import("../../lib").RecursiveElement} newTextElement
     */
    useRendererUpdateText() {
        RecursiveConsole.error("Renderer has no method updateText.");
    }

    useRendererClean() {
        RecursiveConsole.error("Renderer has no method clean.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} tree
     */
    useRendererOnTreePrepared() {
        RecursiveConsole.error("Renderer has no method onTreePrepared.");
    }

    /**
     * @param {Array<string,any>} attribute
     * @param {import("../../lib").NativeElement} instance
     */
    useRendererRemoveAttribute() {
        RecursiveConsole.error("Renderer has no method RemoveAttribute.");
    }

    /**
     * @param {string} attribute
     * @param {any} value
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererSetAttribute() {
        RecursiveConsole.error("Renderer has no method SetAttribute.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererItemInTree() {
        RecursiveConsole.error("Renderer has no method itemInTree.");
    }

    /**
     * @param {string} eventName
     * @param {import("../../lib").NativeElement} instance
     */
    useRendererRemoveEvent() {
        RecursiveConsole.error("Renderer has no method RemoveEvent.");
    }

    /**
     * @param {string} eventName
     * @param {() => void} callback
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererAddEvent() {
        RecursiveConsole.error("Renderer has no method AddEvent.");
    }

    useRendererRenderTree() {
        RecursiveConsole.error("Renderer has no method renderTree.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     * @param {number} newPosition
     */
    useRendererChangeElementPosition() {
        RecursiveConsole.error("Renderer has no method useRendererChangeElementPosition.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererGetElementPosition() {
        RecursiveConsole.error("Renderer has no method useRendererGetElementPosition.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererRemoveElement() {
        RecursiveConsole.error("Renderer has no method useRendererRemoveElement");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} parentElement
     * @param {number} index
     */
    useRendererAddElement() {
        RecursiveConsole.error("Renderer has no method useRendererAddElement.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} newElement
     */
    useRendererReplaceElement() {
        RecursiveConsole.error("Renderer has no method useRendererReplaceElement.");
    }

    /**
     * @param {string} attribute
     */
    useRendererIsAttribute() {
        RecursiveConsole.error("Renderer has no method useRendererIsAttribute.");
    }

    /**
     * @param {string} event
     */
    useRendererIsEvent() {
        RecursiveConsole.error("Renderer has no method useRendererIsEvent.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererCreateInstance() {
        RecursiveConsole.error("Renderer has no method useRendererCreateInstance.");
    }

    /**
     * @param {string} attributeName
     * @param {any} value
     * @param {import("../../lib").NativeElement} instance
     */
    useRendererInjectAttribute() {
        RecursiveConsole.error("Renderer has no method useRendererInjectAttribute.");
    }

    /**
     * @param {any} style
     * @param {import("../../lib").NativeElement} instance
     */
    useRendererInjectStyle() {
        RecursiveConsole.error("Renderer has no method useRendererInjectStyle.");
    }

    /**
     * @param {string} event
     * @param {() => void} callback
     * @param {import("../../lib").NativeElement} instance
     */
    useRendererInjectEvent() {
        RecursiveConsole.error("Renderer has no method useRendererInjectEvent.");
    }

    /**
     * @param {string} event
     * @param {() => void} callback
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererUpdateEvent() {
        RecursiveConsole.error("Renderer has no method useRendererUpdateEvent.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} child
     * @param {import("../../lib").NativeElement} instance
     */
    useRendererInjectChild() {
        RecursiveConsole.error("Renderer has no method useRendererInjectChild.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     */
    useRendererCreateRawContainer() {
        RecursiveConsole.error("Renderer has no method useRendererCreateRawContainer.");
    }

    /**
     * @param {import("../../lib").RecursiveElement} element
     * @param {import("../../lib").RecursiveElement} newElement
     */
    useRendererUpdateRawContainersAgainstEachOthers() {
        RecursiveConsole.error(
            "Renderer has no method useRendererUpdateRawContainersAgainstEachOthers."
        );
    }
}

module.exports = { RecursiveRenderer, createElement };
