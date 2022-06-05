import { throwError } from "../../recursive-dom/RecursiveError.js";
import RecursiveDOMEvents from "../../recursive-dom/RecursiveDOMEvents.js";
import RecursiveHooks from "../../recursive-hooks/RecursiveHooks.js";
import RecursiveFlags from "../../recursive-flags/RecursiveFlags.js";
import RecursiveDOMAttributes from "../../recursive-dom/RecursiveDOMAttributes.js";
import CreateTextNode from "../../create-component/CreateTextNode.js";
import Check from "./Check.js";
import CreateComponent from "../CreateComponent.js";

export default {
    /**
     * Initialize children
     * @param {CreateComponent} component CreateComponent
     * @param {Array<CreateComponent> | CreateComponent} children input children to be initialized
     */
    children: (component, children) => {
        // if children is not null
        if (children !== null) {
            // if children is an array
            if (Array.isArray(children)) {
                // iterate through children
                for (let i = 0; i < children.length; i++) {
                    // skip child if null
                    if (children[i] === null) continue;

                    // throw an error if a child is an array
                    if (Check.isArrayOfComponents(children[i])) {
                        throwError("Child Cannot be of type array", [
                            "Check if you are nesting an array inside the children array.",
                        ]);
                    }

                    // if child is a component.
                    else if (Check.isComponent(children[i])) {
                        // check renderIf value
                        if (children[i].flags.renderIf !== false) {
                            if (children[i].tag === "fragment") {
                                component.children.push(...children[i].children);
                            } else component.children.push(children[i]);
                        }
                    }
                    // else child could be rendered as a text node
                    else {
                        let textNode = children[i];

                        // merge all consecutive non-component child into one text node
                        for (let j = i + 1, l = children.length; j < l; j++) {
                            if (Check.isComponent(children[j]) && children[j] !== null) {
                                break;
                            } else if (Check.isArrayOfComponents(children[j])) {
                                throwError("Child Cannot be of type array", [
                                    "Check if you are nesting an array inside the children array.",
                                ]);
                            } else {
                                textNode = `${textNode}${children[j]}`;
                                i++;
                            }
                        }

                        // push text node
                        component.children.push(CreateTextNode(textNode));
                    }
                }
            }
            // children is a single node
            else if (children !== undefined) {
                if (children.$$createcomponent) {
                    if (children.flags.renderIf !== false) {
                        if (children.tag === "fragment") component.children = children.children;
                        else component.children = [children];
                    }
                }
                // child is a text node
                else {
                    component.children = [CreateTextNode(children)];
                }
            }
            // child is a component
        }
        // no children
        else {
            component.children = [];
        }
    },
    /**
     * Add style className to the classList
     * @param {CreateComponent} component CreateComponent
     * @param {JSON} style style object
     */
    className: (component, style) => {
        // if style is valid
        if (style !== undefined) {
            // check if className is valid
            if (style.className !== undefined) {
                Check.isValidClassName(style.className);
                if (!component.className) {
                    component.className = style.className;
                } else {
                    component.className = `${component.className} ${style.className}`;
                }
            }
        }

        if (component.className) {
            const classList = component.className.toString().split(" ");
            for (var i = 0, j = classList.length; i < j; i++) {
                Check.isValidClassName(classList[i]);
            }
        } else {
            component.className = "";
        }
    },
    /**
     * @param {CreateComponent} component - to be initialized
     * @param {JSON} events - events to be injected
     * @throws an error whenever an event is not a function or doesn't have a valid name
     */
    events: (component, events) => {
        for (var event in events) {
            if (RecursiveDOMEvents[event]) {
                if (typeof events[event] === "function") {
                    component.events[event] = events[event];
                } else {
                    throwError(`${event} is not function.`, ["Event is not of type function"]);
                }
            } else {
                throwError(`${event} is not a valid event name or is yet to be implemented.`, [
                    "Event name is non-existant",
                    "List of events : https://github.com/RiadhAdrani/recursive/blob/91b3cb8ae80fcbc7aa402b1d7814c0d2b7a0e779/RecursiveDOM/Recursivejs#L537",
                ]);
            }
        }
    },
    /**
     * @param component - component
     * @param list - input list
     */
    flags: (component, flags) => {
        for (let f in flags) {
            if (RecursiveFlags[f]) {
                component.flags[f] = flags[f];
            }
        }
    },
    /**
     * @param component component to be initi
     * @param hooks
     */
    hooks: (component, hooks) => {
        for (var hook in hooks) {
            if (hooks[hook] !== undefined) {
                if (RecursiveHooks[hook]) {
                    if (typeof hooks[hook] === "function") {
                        component.hooks[hook] = hooks[hook];
                    } else {
                        throwError(`${hook} is not a function.`, ["Hook is not of type function"]);
                    }
                } else {
                    throwError(`${hook} is not a valid hook name.`, [
                        "Hook name is non-existant",
                        "List of hooks : https://github.com/RiadhAdrani/recursive/blob/91b3cb8ae80fcbc7aa402b1d7814c0d2b7a0e779/RecursiveDOM/Recursivejs#L645",
                    ]);
                }
            }
        }
    },
    /**
     * @param component component to be initialized
     * @param attributes list to add
     */
    attributes: (component, attributes) => {
        for (var attr in attributes) {
            if (RecursiveDOMAttributes[attr]) {
                if (attributes[attr]) {
                    component.props[attr] = attributes[attr];
                }
            }
        }
    },
};