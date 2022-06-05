import RecursiveDOM from "../recursive-dom/RecursiveDOM.js";
import Init from "./tools/Init.js";
import Render from "./tools/Render.js";
import Update from "./tools/Update.js";
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

        Init.className(this, style);
        Init.attributes(this, { ...props, className: this.className });
        Init.events(this, events);
        Init.hooks(this, hooks);
        Init.flags(this, flags);
        Init.children(this, children);

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

    /**
     * modify the render process
     * @param {HTMLElement} render html element to be rendered
     */
    superRender(render) {}

    /**
     * Convert the Recursive representation into a DOM element.
     * @returns {HTMLElement} DOM element.
     */
    render() {
        let render = document.createElement(this.tag);

        // add attributes
        Render.attributes(this, render);
        // renderattributes(this, render);

        // add events
        // renderevents(this, render);
        Render.events(this, render);

        // inject children inside the rendered element
        // renderchildren(this.children, render);
        Render.children(this, render);

        this.superRender(render);

        this.domInstance = render;

        return render;
    }

    /**
     * execute after the component has updated
     * @param {CreateComponent | string} newComponent
     */
    superUpdate(newComponent) {}

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
        Update.events(newComponent, htmlElement);

        // update inline style
        // const inlineStyleDidUpdate = Style.updateInline(this, newComponent);

        // update class names
        if (this.className !== newComponent.className) {
            if (newComponent.className) {
                htmlElement.className = newComponent.className;
            } else {
                htmlElement.className = "";
            }
        }

        // update attributes
        const attributesDidUpdate = Update.attributes(this, newComponent, htmlElement);

        // update children
        Update.children(this, newComponent, htmlElement);

        // check if there is any change
        didUpdate = attributesDidUpdate ? true : false;

        this.superUpdate(newComponent);

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