import RecursiveDOM from "../recursive-dom/RecursiveDOM.js";
import RecursiveDOMEvents from "../recursive-dom/RecursiveDOMEvents.js";
import { throwError } from "../recursive-dom/RecursiveError.js";
import {
    requestBatchingEnd,
    requestBatchingStart,
} from "../recursive-orchestrator/RecursiveOrchestrator.js";
import { setRef } from "../recursive-state/SetReference.js";
import {
    endCurrentContext,
    getContext,
    startContext,
} from "../recursive-context/RecursiveContext.js";
import RecursiveDOMAttributes from "../recursive-dom/RecursiveDOMAttributes.js";
import CreateTextNode from "./CreateTextNode.js";
import RecursiveFlags from "../recursive-flags/RecursiveFlags.js";
import RecursiveHooks from "../recursive-hooks/RecursiveHooks.js";

/**
 * ## CreateComponent
 * ### The modular unit to build a Recursive Web App.
 * CreateComponent is a representation of an HTML element,
 * it can update, destroy and update itself according the need of the developer.
 * Children component can be injected too, which have the same abilities as their parent,
 * and like that, the library got its name.
 * @see {@link RecursiveDOM}
 */
class CreateComponent {
    /**
     * Create a new component
     * @param {Object} param
     * @param {string} param.tag "Html tag"
     * @param {Array} param.children an array of children. A child can be of type `CreateComponent`, `string`, `boolean`, `number`. `null` value will be ignored.
     * @param {JSON} param.events event handlers.
     * @param {boolean} param.renderIf determine if the component should be rendered or not.
     * @param {string} param.className the equivalent of html classes
     * @param {JSON} param.style external style sheet
     * @param {JSON} param.inlineStyle component inline style
     * @param {JSON} param.props the equivalent of html attributes
     * @param {JSON} param.hooks define lifecycle methods for the component.
     * @param {JSON} param.flags define flags for component updating.
     * @param {Function} param.hooks define lifecycle methods.
     */
    constructor({ tag, children, events, className, style, props, flags, key, hooks = {} }) {
        // tag cannot be
        if (!tag) {
            throwError('"tag" should not be empty or null.', [
                "Make sure to pass an HTML tag to your component.",
            ]);
        }

        // CreateComponent specific props
        this.$$createcomponent = "create-component";

        // key
        this.key = key;

        // HTML Attributes
        this.tag = tag;

        this.props = {};

        this.children = [];
        this.flags = {};
        this.hooks = {};
        this.events = {};

        this.ref = undefined;
        this.domInstance = undefined;

        if (this.flags.renderIf == false && this.flags.renderIf != undefined) return;

        // props
        if (className) this.className = className;
        if (style) this.style = style;

        this.prepareClassName();
        this.prepareAttributes({ ...props, className: this.className });
        this.prepareEvents(events);
        this.prepareHooks(hooks);
        this.prepareFlags(flags);
        this.prepareChildren(children);

        this.map = false;
        if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].key) {
                    if (!this.map) this.map = {};

                    if (this.map[this.children[i].key])
                        throwError(
                            `Component with the key ${this.children[i].key} already exists.`,
                            ["Two or more components has the same key."]
                        );

                    this.map[this.children[i].key] = { c: this.children[i], i };
                } else {
                    this.map = false;
                }
            }
        }
    }

    prepareChildren(children) {
        // if children is not null
        if (children !== null) {
            // if children is an array
            if (this.isArray(children)) {
                // iterate through children
                for (let i = 0; i < children.length; i++) {
                    // skip child if null
                    if (children[i] === null) continue;

                    // throw an error if a child is an array
                    if (this.isArray(children[i])) {
                        throwError("Child Cannot be of type array", [
                            "Check if you are nesting an array inside the children array.",
                        ]);
                    }

                    // if child is a component.
                    else if (this.isComponent(children[i])) {
                        // check renderIf value
                        if (children[i].flags.renderIf !== false) {
                            if (children[i].tag === "fragment") {
                                this.children.push(...children[i].children);
                            } else this.children.push(children[i]);
                        }
                    }
                    // else child could be rendered as a text node
                    else {
                        let textNode = children[i];

                        // merge all consecutive non-component child into one text node
                        for (let j = i + 1, l = children.length; j < l; j++) {
                            if (this.isComponent(children[j]) && children[j] !== null) {
                                break;
                            } else if (this.isArrayOfComponents(children[j])) {
                                throwError("Child Cannot be of type array", [
                                    "Check if you are nesting an array inside the children array.",
                                ]);
                            } else {
                                textNode = `${textNode}${children[j]}`;
                                i++;
                            }
                        }

                        // push text node
                        this.children.push(CreateTextNode(textNode));
                    }
                }
            }
            // children is a single node
            else if (children !== undefined) {
                if (children.$$createcomponent) {
                    if (children.flags.renderIf !== false) {
                        if (children.tag === "fragment") this.children = children.children;
                        else this.children = [children];
                    }
                }
                // child is a text node
                else {
                    this.children = [CreateTextNode(children)];
                }
            }
            // child is a component
        }
        // no children
        else {
            component.children = [];
        }
    }

    prepareEvents(events) {
        for (var event in events) {
            if (RecursiveDOMEvents[event]) {
                if (typeof events[event] === "function") {
                    this.events[event] = events[event];
                } else {
                    throwError(`${event} is not function.`, ["Event is not of type function"]);
                }
            } else {
                throwError(`${event} is not a valid event name or is yet to be implemented.`, [
                    "Event name is non-existant",
                ]);
            }
        }
    }

    prepareFlags(flags) {
        for (let f in flags) {
            if (RecursiveFlags[f]) {
                this.flags[f] = flags[f];
            }
        }
    }

    prepareAttributes(attributes) {
        for (var attr in attributes) {
            if (RecursiveDOMAttributes[attr]) {
                if (attributes[attr]) {
                    this.props[attr] = attributes[attr];
                }
            }
        }
    }

    prepareClassName() {
        // if style is valid
        if (this.style !== undefined && this.style.className !== undefined) {
            // check if className is valid
            this.isValidClassName(this.style.className);
            if (!this.className) {
                this.className = this.style.className;
            } else {
                this.className = `${this.className} ${this.style.className}`;
            }
        }

        if (this.className) {
            const classList = this.className.toString().split(" ");
            for (var i = 0, j = classList.length; i < j; i++) {
                this.isValidClassName(classList[i]);
            }
        } else {
            this.className = "";
        }
    }

    prepareHooks(hooks) {
        for (var hook in hooks) {
            if (hooks[hook] !== undefined) {
                if (RecursiveHooks[hook]) {
                    if (typeof hooks[hook] === "function") {
                        this.hooks[hook] = hooks[hook];
                    } else {
                        throwError(`${hook} is not a function.`, ["Hook is not of type function"]);
                    }
                } else {
                    throwError(`${hook} is not a valid hook name.`, ["Hook name is non-existant"]);
                }
            }
        }
    }

    isValidClassName(classname) {
        return !classname
            ? true
            : /^[a-zA-Z]([a-zA-Z0-9]|(-))+$/.test(classname)
            ? true
            : throwError(`${classname} is not a valid className`, [
                  'Class name can only include alphaneumerical characters and "-".',
                  "Class name should not contain spaces.",
              ]);
    }

    isArray(items) {
        return Array.isArray(items);
    }

    isComponent(item) {
        return item instanceof CreateComponent;
    }

    /**
     * assign UIDs
     */
    uidify(index) {
        const uid = getContext() ? `${getContext().uid}-${index}` : "0";
        this.uid = uid;
        startContext({ uid });
        this.children.forEach((child, indx) => {
            child.uidify(indx);
        });
        endCurrentContext();
    }

    renderAttributes(element) {
        for (let p in this.props) {
            element[RecursiveDOMAttributes[p]] = this.props[p];
        }

        if (this.style) {
            if (this.style.inline) {
                for (let att in this.style.inline) {
                    element.style[att] = this.style.inline[att];
                }
            }
        }
    }

    renderEvents(element) {
        if (this.events) {
            function addEvent(prop, event) {
                element.events[prop] = event;

                if (RecursiveDOMEvents[prop].handler) {
                    RecursiveDOMEvents[prop].handler(element);
                } else {
                    element.addEventListener(RecursiveDOMEvents[prop].listener, (e) => {
                        requestBatchingStart(`event-${prop}`);

                        element.events[prop](e);

                        requestBatchingEnd(`event-${prop}`);
                    });
                }
            }

            element.events = {};

            for (var event in this.events) {
                if (RecursiveDOMEvents[event]) {
                    addEvent(event, this.events[event]);
                }
            }
        }
    }

    renderChildren(element) {
        this.children.forEach((child) => element.append(child.render()));
    }

    /**
     * Convert the Recursive representation into a DOM element.
     * @returns {HTMLElement} DOM element.
     */
    render() {
        let render = document.createElement(this.tag);

        this.renderAttributes(render);
        this.renderEvents(render);
        this.renderChildren(render);

        this.domInstance = render;

        return render;
    }

    updateAttributes(newComponent) {
        let didUpdate = false;

        const updateAttr = (attr) => {
            if (newComponent.props[attr]) {
                this.domInstance[attr] = newComponent.props[attr];
            } else {
                this.domInstance[attr] = "";
            }
            didUpdate = true;
        };

        for (let prop in newComponent.props) {
            if (RecursiveDOMAttributes[prop]) {
                if (this.props[prop] !== newComponent.props[prop]) {
                    updateAttr(prop);
                }
            }
        }

        for (let prop in this.props) {
            if (RecursiveDOMAttributes[prop] && !newComponent.props[prop]) {
                this.domInstance[prop] = "";
            }
        }

        if (newComponent.style) {
            if (newComponent.style.inline) {
                if (this.style) {
                    if (this.style.inline) {
                        for (let att in this.style.inline) {
                            if (newComponent.style.inline[att] == undefined) {
                                this.domInstance.style[att] = "";
                            }
                        }
                    }
                }

                for (let att in newComponent.style.inline) {
                    this.domInstance.style[att] = newComponent.style.inline[att];
                }
            } else {
                if (this.style) {
                    if (this.style.inline) {
                        for (let att in component.style.inline) {
                            this.domInstance.style[att] = "";
                        }
                    }
                }
            }
        } else {
            if (this.style) {
                if (this.style.inline) {
                    for (let att in this.style.inline) {
                        this.domInstance.style[att] = "";
                    }
                }
            }
        }

        return didUpdate;
    }

    updateChildren(newComponent) {
        // Check for a missing node element.
        // rerender the whole component tree if an element is missing
        for (let i in this.children) {
            if (!document.contains(this.children[i].domInstance)) {
                this.$replaceInDOM(newComponent);
                return;
            }
        }

        // Check for mapping
        if (this.map && newComponent.map) {
            for (let key in this.map) {
                if (!newComponent.map[key]) {
                    this.map[key].c.$removeFromDOM();
                    delete this.map[key];
                }
            }

            for (let key in this.map) {
                this.map[key].c.update(newComponent.map[key].c);
            }

            for (let key in newComponent.map) {
                if (!this.map[key]) {
                    this.map[key] = {
                        ...newComponent.map[key],
                        i: Object.keys(this.map).length,
                    };
                    newComponent.map[key].c.$appendInDOM(this);
                }
            }

            for (let key in this.map) {
                if (this.map[key].i !== newComponent.map[key].i)
                    this.map[key].c.$changePosition(this, newComponent.map[key].i);
            }
        } else {
            const compareEqualChildren = () => {
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].update(newComponent.children[i]);
                }
            };

            if (this.children.length === newComponent.children.length) {
                compareEqualChildren();
            }
            // if component.children are greater than newComponent.children
            else if (this.children.length > newComponent.children.length) {
                while (thist.children.length > newComponent.children.length) {
                    this.children.pop().$removeFromDOM();
                }
                compareEqualChildren();
            }
            // if component.children are less than newComponent.children
            else {
                for (let i = this.children.length; i < newComponent.children.length; i++) {
                    newComponent.children[i].$appendInDOM(this);
                }
                compareEqualChildren();
            }
        }
    }

    updateEvents(newComponent) {
        const updateEvent = (prop) => {
            this.domInstance.events[prop] = newComponent.events[prop];
        };

        if (newComponent.events) {
            if (!this.domInstance.events) {
                this.domInstance.events = {};
            }

            for (let event in newComponent.events) {
                if (!this.domInstance.events[event]) {
                    this.domInstance.addEventListener(RecursiveDOMEvents[event].listener, (e) => {
                        requestBatchingStart(`event-${event}`);

                        this.domInstance.events[event](e);

                        requestBatchingEnd(`event-${event}`);
                    });
                }
                updateEvent(event);
            }

            for (let event in this.domInstance.events) {
                if (!newComponent.events[event]) {
                    this.domInstance.events[event] = () => {};
                }
            }
        } else {
            this.domInstance.events = {};
        }
    }

    /**
     * Compare the current component with another given one and update the `DOM` if needed.
     * @param {CreateComponent | string} newComponent
     */
    update(newComponent) {
        let didUpdate = false;

        // get the dom instance of the component
        const htmlElement = this.domInstance;

        if (!htmlElement) {
            throwError(
                "Component not found inside the DOM tree: This error should not happen: Report a bug to https://github.com/RiadhAdrani/recursive",
                ["You may have tried to manipulate the DOM manually outside the Recursive context."]
            );
        }

        // FLAGS
        // flags.forceRerender
        // Just rerender the component
        if (this.flags.forceRerender === true) {
            this.$replaceInDOM(newComponent);
            return;
        }

        // check if the new element have a different tag
        if (this.tag !== newComponent.tag) {
            this.$replaceInDOM(newComponent);
            return;
        }

        // update events
        this.updateEvents(newComponent);

        // update inline style
        // const inlineStyleDidUpdate = Style.updateInline(this, newComponent);

        // // update class names
        // if (this.className !== newComponent.className) {
        //     if (newComponent.className) {
        //         htmlElement.className = newComponent.className;
        //     } else {
        //         htmlElement.className = "";
        //     }
        // }

        // update attributes
        const attributesDidUpdate = this.updateAttributes(newComponent);

        // update children
        this.updateChildren(newComponent);

        // check if there is any change
        didUpdate = attributesDidUpdate ? true : false;

        newComponent.domInstance = this.domInstance;

        // RecursiveDOM.enqueueOnRef(() => newComponent.$onRef());

        // Execute update lifecycle method
        if (didUpdate) {
            RecursiveDOM.enqueuOnUpdated(() => newComponent.$onUpdated());
        }
    }

    // LIFE CYCLE METHODS
    // ------------------------------------------------------------------------------------------------------

    /**
     * Allow the user to execute custom actions if the current component was just updated.
     * @param {CreateComponent | string} oldComponent - current component
     * @param {CreateComponent | string} newComponent - the new component
     */
    $onUpdated() {
        if (typeof this.hooks.onUpdated === "function") {
            requestBatchingStart("on-updated");
            this.hooks.onUpdated(this.domInstance);
            requestBatchingEnd("on-updated");
        }
    }

    /**
     * Allow the user to execute custom actions when the component has been created.
     */
    $onCreated() {
        if (typeof this.hooks.onCreated === "function") {
            requestBatchingStart("on-created");
            this.hooks.onCreated(this.domInstance);
            requestBatchingEnd("on-created");
        }
        if (this.children) {
            this.children.forEach((child) => {
                if (child.$$createcomponent) {
                    child.$onCreated();
                }
            });
        }
    }

    /**
     * Allow the user to execute custom actions when the component has been destroyed.
     */
    $onDestroyed() {
        if (typeof this.hooks.onDestroyed === "function") {
            requestBatchingStart("on-destroyed");
            this.hooks.onDestroyed(this);
            requestBatchingEnd("on-destroyed");
        }

        if (this.children) {
            this.children.forEach((child) => {
                if (child.$$createcomponent) {
                    child.$onDestroyed();
                }
            });
        }
    }

    /**
     * Execute everytime the RecursiveDOM updates
     */
    $onRerender() {}

    /**
     * Allow the user to execute custom actions just before the destruction of the component.
     */
    $beforeDestroyed() {
        if (typeof this.hooks.beforeDestroyed === "function") {
            requestBatchingStart("before-destroyed");
            this.hooks.beforeDestroyed(this);
            requestBatchingEnd("before-destroyed");
        }

        if (this.children) {
            this.children.forEach((child) => {
                if (child.$$createcomponent) {
                    child.$beforeDestroyed();
                }
            });
        }
    }

    $onRef() {
        if (typeof this.hooks.onRef === "function") {
            const ref = this.hooks.onRef(this.domInstance);
            if (typeof ref === "string") {
                this.ref = ref;
                setRef(ref, this.domInstance);
            }
        }
    }

    $onRefRecursively() {
        this.$onRef();
        this.children.forEach((child) => child.$onRefRecursively());
    }

    // DOM MANIPULATION METHODS
    // ------------------------------------------------------------------------------------------------------

    /**
     * remove the current dom instance
     */
    $removeFromDOM() {
        RecursiveDOM.enqueueBeforeDestroyed(() => this.$beforeDestroyed());
        RecursiveDOM.enqueueDomAction(() => this.domInstance.remove());
        RecursiveDOM.enqueueOnDestroyed(() => this.$onDestroyed());
    }

    /**
     * replace the current dom instance with a newly created one
     * @param {CreateComponent} newComponent component to render
     */
    $replaceInDOM(newComponent) {
        RecursiveDOM.enqueueBeforeDestroyed(() => this.$beforeDestroyed());
        RecursiveDOM.enqueueDomAction(() => this.domInstance.replaceWith(newComponent.render()));
        RecursiveDOM.enqueueOnDestroyed(() => this.$onDestroyed());
        RecursiveDOM.enqueuOnCreated(() => newComponent.$onCreated());
        // RecursiveDOM.enqueueOnRef(() => newComponent.$onRef());
    }

    /**
     * inject the recursive component into the
     * @param {CreateComponent} parentComponent
     */
    $appendInDOM(parentComponent) {
        RecursiveDOM.enqueueDomAction(() => parentComponent.domInstance.append(this.render()));
        RecursiveDOM.enqueuOnCreated(() => this.$onCreated());
        // RecursiveDOM.enqueueOnRef(() => this.$onRef());
    }

    /**
     * change the position of the current dom instance
     * @param {CreateComponent} parentComponent
     * @param {Number} position
     */
    $changePosition(parentComponent, position) {
        // console.log(
        //      `changing ${this.domInstance.innerHTML} with ${parentComponent.domInstance.children[position].innerHTML}`
        // );

        RecursiveDOM.enqueueDomAction(() =>
            parentComponent.domInstance.insertBefore(
                this.domInstance,
                parentComponent.domInstance.children[position]
            )
        );
    }

    // STYLING
    // ------------------------------------------------------------------------------------------------------

    /**
     * Send the `styleSheet` object to the RecursiveDOM to be processed.
     * @deprecated
     */
    addExternalStyle() {
        RecursiveDOMEvents.sendCSSobject({ ...this.style });

        if (this.children) {
            this.children.forEach((child) => {
                if (child.render) {
                    child.addExternalStyle();
                }
            });
        }
    }

    /**
     * Transform the UID into a unqie and valid className
     * @returns {String} unique className
     */
    makeUniqueClassName() {
        if (!this.style) return "";
        if (!this.style.scoped) return "";

        function convert(n) {
            return String.fromCharCode((n % 25) + 97);
        }

        return [...this.uid]
            .map((char, i) => {
                return convert(char == "-" ? i : char.charCodeAt());
            })
            .join("");
    }

    /**
     * Flatten the style sheet of a component and its children
     * @returns {Array<JSON>} component and its children style sheets as an array
     */
    flattenStyle() {
        const output = [];

        if (this.children) {
            this.children.forEach((child) => {
                output.push(...child.flattenStyle());
            });
        }

        if (this.style) {
            if (this.style.scoped) {
                const scoping = `-${this.tag}-${this.makeUniqueClassName()}`;
                const addSpace = !this.style.className;

                this.style.className = !addSpace ? this.style.className + scoping : scoping;
                this.className = this.className + (addSpace ? " " : "") + scoping;
                this.props.className = this.className;
            }

            output.push(this.style);
        }

        return output;
    }
}

export default CreateComponent;
