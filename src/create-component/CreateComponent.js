// import RecursiveDOM from "../recursive-dom/RecursiveDOM.js";
import {
    pushBeforeDestroyed,
    pushDom,
    pushOnCreated,
    pushOnDestroyed,
    pushOnUpdated,
} from "../recursive-reconciler/RecursiveReconciler.js";
import { is as isEv, getListener, hasHandler, get as getEv } from "../recursive-dom/DomEvents.js";
import { throwError } from "../recursive-dom/RecursiveError.js";
import { setRef } from "../recursive-state/SetReference.js";
import {
    endCurrentContext,
    getContext,
    startContext,
} from "../recursive-context/RecursiveContext.js";
import { is as isAttr, get as getAttr, isToggle } from "../recursive-dom/DomAttributes.js";
import CreateTextNode from "./CreateTextNode.js";
import RecursiveFlags from "../recursive-flags/RecursiveFlags.js";
import { updateAfter } from "../recursive-state/SetState.js";

/**
 * ## CreateComponent
 * ### The modular unit to build a Recursive Web App.
 * CreateComponent is a representation of an HTML element,
 * it can update, destroy and update itself according the need of the developer.
 * Children component can be injected too, which have the same abilities as their parent,
 * and like that, the library got its name.
 */
class CreateComponent {
    /**
     * Create a new component
     * @param {Object} param
     * @param {string} param.tag "Html tag"
     * @param {Array} param.children an array of children. A child can be of type `CreateComponent`, `string`, `boolean`, `number`. `null` value will be ignored.
     * @param {JSON} param.events event handlers.
     * @param {string} param.key unique identifier within siblings
     * @param {JSON} param.style external style sheet
     * @param {JSON} param.props the equivalent of html attributes
     * @param {JSON} param.hooks define lifecycle methods for the component.
     * @param {JSON} param.flags define flags for component updating.
     * @param {JSON} param.data define data set.
     */
    constructor({ tag, children, events, style, props, flags, key, hooks, data }) {
        // tag cannot be
        if (!tag) {
            throwError('"tag" should not be empty or null.', [
                "Make sure to pass an HTML tag to your component.",
            ]);
        }

        // key
        this.key = key;

        // HTML Attributes
        this.tag = tag;

        this.props = {};

        this.children = [];
        this.flags = {};
        this.hooks = {};
        this.events = {};
        this.data = data || {};

        this.ref = undefined;
        this.domInstance = undefined;

        if (this.flags.renderIf == false && this.flags.renderIf != undefined) return;

        // props
        if (style) this.style = style;

        this.prepare(props, events, hooks, flags, children);
    }

    /**
     * Prepare the attributes, events, hooks, flags and children so that
     * rendering and updating could happen directly without checking.
     * @param {JSON} props
     * @param {JSON} events
     * @param {JSON} hooks
     * @param {JSON} flags
     * @param {JSON} children
     */
    prepare(props, events, hooks, flags, children) {
        this.prepareAttributes(props);
        this.prepareEvents(events);
        this.prepareHooks(hooks);
        this.prepareFlags(flags);
        this.prepareChildren(children);
        this.prepareMap();
    }

    /**
     * Verify if a map could be created from existing children.
     */
    prepareMap() {
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

    /**
     * Process a single child
     * @param {CreateComponent} child
     */
    prepareChild(child) {
        if ([null, undefined].includes(child)) return;

        if (this.isArray(child))
            throwError(
                "Child cannot be an array. use fragment component to render arrays as children.",
                []
            );

        if (this.isComponent(child)) {
            if (child.flags.renderIf !== false)
                if (child.tag === "fragment") this.children.push(...child.children);
                else this.children.push(child);
        } else {
            this.children.push(CreateTextNode(child));
        }
    }

    /**
     * Transform the given children into an array.
     * @param {Array | CreateComponent | String} children
     */
    prepareChildren(children) {
        if ([null, undefined].includes(children)) return;

        if (this.isArray(children)) {
            children.forEach((child) => this.prepareChild(child));
        } else {
            this.prepareChild(children);
        }
    }

    /**
     * Add only the valid events to the component.
     * @param {JSON} events
     */
    prepareEvents(events) {
        for (var event in events) {
            if (!isEv(event))
                throwError(`${event} is not a valid event name or is yet to be implemented.`, [
                    "Event name is non-existant",
                ]);

            if (typeof events[event] !== "function")
                throwError(`${event} is not function.`, ["Event is not of type function"]);

            this.events[event] = events[event];
        }
    }

    /**
     * Add valid flags to the components.
     * @param {JSON} flags
     */
    prepareFlags(flags) {
        for (let f in flags) {
            if (RecursiveFlags[f] === undefined) continue;

            this.flags[f] = flags[f];
        }
    }

    /**
     * Add only the valid attributes to the components.
     * @param {JSON} attributes
     */
    prepareAttributes(attributes) {
        for (var attr in attributes) {
            if (isAttr(attr)) this.props[attr] = attributes[attr];
        }
    }

    /**
     * Add only the valid hooks.
     * @param {JSON} hooks
     */
    prepareHooks(hooks) {
        for (var hook in hooks) {
            if (hooks[hook] === undefined)
                throwError(`${hook} is not a valid hook name.`, ["Hook name is non-existant"]);
            if (typeof hooks[hook] !== "function")
                throwError(`${hook} is not a function.`, ["Hook is not of type function"]);

            this.hooks[hook] = hooks[hook];
        }
    }

    /**
     * Test if the given class name is valid.
     * @param {String} classname
     * @returns {Boolean} true | false
     */
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

    /**
     * check if the given item is an array.
     * @param {Any} item
     * @returns {Boolean}
     */
    isArray(item) {
        return Array.isArray(item);
    }

    /**
     * Check if item is of type `CreateComponent`.
     * @param {Any} item
     * @returns
     */
    isComponent(item) {
        return item instanceof CreateComponent;
    }

    /**
     * Assign uid to the component and its children.
     * @param {String} index
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

    /**
     * Inject HTML dataset attribute into the rendered element.
     * @param {HTMLElement} element
     */
    renderDataSet(element) {
        for (let item in this.data) {
            element.dataset[item] = this.data[item];
        }
    }

    /**
     * Inject HTML attributes into the rendered element.
     * @param {HTMLElement} element
     */
    renderAttributes(element) {
        for (let p in this.props) {
            if (isToggle(p)) {
                element.toggleAttribute(getAttr(p), this.props[p] == true);
            } else {
                element.setAttribute(getAttr(p), this.props[p]);
            }
        }

        this.renderDataSet(element);

        if (this.style && this.style.inline) {
            for (let att in this.style.inline) {
                element.style[att] = this.style.inline[att];
            }
        }
    }

    /**
     * Inject events into the rendered element.
     * @param {HTMLElement} element
     */
    renderEvents(element) {
        element.events = {};

        function addEvent(prop, event) {
            element.events[prop] = event;

            if (hasHandler(prop)) {
                getEv(prop).handler(element);
            } else {
                element.addEventListener(getListener(prop), (e) => {
                    updateAfter(() => {
                        element.events[prop](e);
                    });
                });
            }
        }

        for (var event in this.events) {
            addEvent(event, this.events[event]);
        }
    }

    /**
     * Inject children into the rendered element.
     * @param {HTMLElement} element
     */
    renderChildren(element) {
        this.children.forEach((child) => element.append(child.render()));
    }

    /**
     * create the barebones of an element
     * @returns {HTMLElement}
     */
    createElement() {
        return document.createElement(this.tag);
    }

    /**
     * Convert the Recursive representation into a DOM element.
     * @returns {HTMLElement} DOM element.
     */
    render() {
        let render = this.createElement();

        this.renderAttributes(render);
        this.renderEvents(render);
        this.renderChildren(render);

        this.domInstance = render;

        return render;
    }

    /**
     * Update the current component with new dataset.
     * @param {CreateComponent} newComponent
     */
    updateDataSet(newComponent) {
        for (let item in this.data) {
            if (newComponent.data[item] === undefined)
                pushDom(() => delete this.domInstance.dataset[item]);
        }

        for (let item in newComponent.data) {
            if (this.data[item] !== newComponent.data[item]) {
                pushDom(() => (this.domInstance.dataset[item] = newComponent.data[item]));
            }
        }
    }

    /**
     * Update the current component with new attributes.
     * @param {CreateComponent} newComponent
     */
    updateAttributes(newComponent) {
        let didUpdate = false;

        for (let prop in newComponent.props) {
            if (this.props[prop] === newComponent.props[prop]) continue;
            if (newComponent.props[prop] === undefined) continue;

            pushDom(() => {
                if (isToggle(prop)) {
                    this.domInstance.toggleAttribute(
                        getAttr(prop),
                        newComponent.props[prop] == true
                    );
                } else this.domInstance.setAttribute(getAttr(prop), newComponent.props[prop]);
            });

            didUpdate = true;
        }

        for (let prop in this.props) {
            if (newComponent.props[prop] === undefined) {
                pushDom(() => {
                    this.domInstance.removeAttribute(prop);
                });
            }
        }

        this.updateDataSet(newComponent);

        if (newComponent.style && newComponent.style.inline) {
            if (this.style && this.style.inline) {
                for (let att in this.style.inline) {
                    if (newComponent.style.inline[att] == undefined) {
                        pushDom(() => {
                            this.domInstance.style[att] = "";
                        });
                    }
                }
            }

            for (let att in newComponent.style.inline) {
                pushDom(() => {
                    this.domInstance.style[att] = newComponent.style.inline[att];
                });
            }
        } else {
            if (this.style && this.style.inline) {
                for (let att in this.style.inline) {
                    pushDom(() => {
                        this.domInstance.style[att] = "";
                    });
                }
            }
        }

        return didUpdate;
    }

    /**
     * Compare equal number of children
     * @param {CreateComponent} newComponent
     */
    compareEqualChildren(newComponent) {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update(newComponent.children[i]);
        }
    }

    /**
     * Update mapped children
     * @param {CreateComponent} newComponent
     */
    updateWithMap(newComponent) {
        for (let key in this.map) {
            if (!newComponent.map[key]) {
                this.map[key].c.removeFromDOM();
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
                newComponent.map[key].c.appendInDOM(this);
            }
        }

        for (let key in this.map) {
            if (this.map[key].i !== newComponent.map[key].i)
                this.map[key].c.changePosition(this, newComponent.map[key].i);
        }
    }

    /**
     * Update the current component with new children.
     * @param {CreateComponent} newComponent
     */
    updateChildren(newComponent) {
        // Check for a missing node element.
        // rerender the whole component tree if an element is missing
        for (let i in this.children) {
            if (!document.contains(this.children[i].domInstance)) {
                this.replaceInDOM(newComponent);
                return;
            }
        }

        // Check for mapping
        if (this.map && newComponent.map) {
            this.updateWithMap(newComponent);
        } else {
            if (this.children.length === newComponent.children.length) {
                this.compareEqualChildren(newComponent);
            }
            // if component.children are greater than newComponent.children
            else if (this.children.length > newComponent.children.length) {
                // reduce the number of children
                while (this.children.length > newComponent.children.length) {
                    this.children.pop().removeFromDOM();
                }

                this.compareEqualChildren(newComponent);
            }
            // if component.children are less than newComponent.children
            else {
                // append the extra children directly into the dom and compare the rest
                for (let i = this.children.length; i < newComponent.children.length; i++) {
                    newComponent.children[i].appendInDOM(this);
                }
                this.compareEqualChildren(newComponent);
            }
        }
    }

    /**
     * Update the current component with new events.
     * @param {CreateComponent} newComponent
     */
    updateEvents(newComponent) {
        for (let event in this.domInstance.events) {
            if (!newComponent.events[event]) {
                pushDom(() => {
                    this.domInstance.events[event] = () => {};
                });
            }
        }

        if (newComponent.events) {
            if (!this.domInstance.events) {
                pushDom(() => {
                    this.domInstance.events = {};
                });
            }

            for (let event in newComponent.events) {
                pushDom(() => {
                    this.domInstance.events[event] = newComponent.events[event];
                });

                if (!this.events[event]) {
                    if (hasHandler(event)) {
                        pushDom(() => {
                            getEv(event).handler(this.domInstance);
                        });
                    } else
                        pushDom(() => {
                            this.domInstance.addEventListener(getListener(event), (e) => {
                                updateAfter(() => {
                                    this.domInstance.events[event](e);
                                });
                            });
                        });
                }
            }
        }
    }

    /**
     * Compare the current component with another given one and update the `DOM` if needed.
     * @param {CreateComponent | string} newComponent
     */
    update(newComponent) {
        let didUpdate = false;

        const htmlElement = this.domInstance;

        if (!htmlElement) {
            throwError(
                "Component not found inside the DOM tree: This error should not happen: Report a bug to https://github.com/RiadhAdrani/recursive",
                ["You may have tried to manipulate the DOM manually outside the Recursive context."]
            );
        }

        if (this.flags.forceRerender === true) {
            this.replaceInDOM(newComponent);
            return;
        }

        if (this.tag !== newComponent.tag) {
            this.replaceInDOM(newComponent);
            return;
        }

        this.updateEvents(newComponent);

        const attributesDidUpdate = this.updateAttributes(newComponent);

        this.updateChildren(newComponent);

        didUpdate = attributesDidUpdate ? true : false;

        newComponent.domInstance = this.domInstance;

        if (didUpdate) {
            pushOnUpdated(() => newComponent.onUpdated());
        }
    }

    // LIFE CYCLE METHODS
    // ------------------------------------------------------------------------------------------------------

    /**
     * Allow the user to execute custom actions if the current component was just updated.
     * @param {CreateComponent | string} oldComponent - current component
     * @param {CreateComponent | string} newComponent - the new component
     */
    onUpdated() {
        if (typeof this.hooks.onUpdated === "function") {
            updateAfter(() => {
                this.hooks.onUpdated(this.domInstance);
            });
        }
    }

    /**
     * Allow the user to execute custom actions when the component has been created.
     */
    onCreated() {
        if (typeof this.hooks.onCreated === "function") {
            updateAfter(() => {
                this.hooks.onCreated(this.domInstance);
            });
        }
        if (this.children) {
            this.children.forEach((child) => child.onCreated());
        }
    }

    /**
     * Allow the user to execute custom actions when the component has been destroyed.
     */
    onDestroyed() {
        if (typeof this.hooks.onDestroyed === "function") {
            updateAfter(() => {
                this.hooks.onDestroyed(this);
            });
        }

        if (this.children) {
            this.children.forEach((child) => child.onDestroyed());
        }
    }

    /**
     * Allow the user to execute custom actions just before the destruction of the component.
     */
    beforeDestroyed() {
        if (typeof this.hooks.beforeDestroyed === "function") {
            updateAfter(() => {
                this.hooks.beforeDestroyed(this);
            });
        }

        if (this.children) {
            this.children.forEach((child) => child.beforeDestroyed());
        }
    }

    onRef() {
        if (typeof this.hooks.onRef === "function") {
            const ref = this.hooks.onRef(this.domInstance);
            if (typeof ref === "string") {
                this.ref = ref;
                setRef(ref, this.domInstance);
            }
        }
    }

    onRefRecursively() {
        this.onRef();
        this.children.forEach((child) => child.onRefRecursively());
    }

    /**
     * remove the current dom instance
     */
    removeFromDOM() {
        pushBeforeDestroyed(() => this.beforeDestroyed());
        pushDom(() => this.domInstance.remove());
        pushOnDestroyed(() => this.onDestroyed());
    }

    /**
     * replace the current dom instance with a newly created one
     * @param {CreateComponent} newComponent component to render
     */
    replaceInDOM(newComponent) {
        pushBeforeDestroyed(() => this.beforeDestroyed());
        pushDom(() => this.domInstance.replaceWith(newComponent.render()));
        pushOnDestroyed(() => this.onDestroyed());
        pushOnCreated(() => newComponent.onCreated());
    }

    /**
     * inject the recursive component into the
     * @param {CreateComponent} parentComponent
     */
    appendInDOM(parentComponent) {
        pushDom(() => parentComponent.domInstance.append(this.render()));
        pushOnCreated(() => this.onCreated());
    }

    /**
     * change the position of the current dom instance
     * @param {CreateComponent} parentComponent
     * @param {Number} position
     */
    changePosition(parentComponent, position) {
        pushDom(() =>
            parentComponent.domInstance.insertBefore(
                this.domInstance,
                parentComponent.domInstance.children[position]
            )
        );
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

        if (this.style && (this.style.scoped || this.style.className)) {
            let styleClassName = this.style.className || "";

            if (this.style.scoped) {
                if (styleClassName) styleClassName += "-";

                styleClassName += `${this.tag}-${this.makeUniqueClassName()}`;
            }

            if (this.props.className) this.props.className += " ";
            else this.props.className = "";

            this.props.className = this.props.className + styleClassName;
            this.style.className = styleClassName;

            output.push(this.style);
        }

        return output;
    }
}

export default CreateComponent;
