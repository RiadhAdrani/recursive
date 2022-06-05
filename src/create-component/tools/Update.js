import PropList from "../../recursive-dom/PropList.js";
import {
    requestBatchingEnd,
    requestBatchingStart,
    requestUpdate,
} from "../../recursive-orchestrator/RecursiveOrchestrator.js";
import CreateComponent from "../CreateComponent.js";

export default {
    /**
     * Update component's attributes
     * @param component old component
     * @param newComponent new component
     * @param render rendered htmlElement
     */
    attributes: (component, newComponent, render) => {
        let didUpdate = false;

        function updateAttr(attr) {
            if (newComponent.props[attr]) {
                render[attr] = newComponent.props[attr];
            } else {
                render[attr] = "";
            }
            didUpdate = true;
        }

        for (let prop in newComponent.props) {
            if (PropList.Attributes[prop]) {
                if (component.props[prop] !== newComponent.props[prop]) {
                    updateAttr(prop);
                }
            }
        }

        for (let prop in component.props) {
            if (PropList.Attributes[prop] && !newComponent.props[prop]) {
                render[prop] = "";
            }
        }

        if (newComponent.style) {
            if (newComponent.style.inline) {
                if (component.style) {
                    if (component.style.inline) {
                        for (let att in component.style.inline) {
                            if (newComponent.style.inline[att] == undefined) {
                                render.style[att] = "";
                            }
                        }
                    }
                }

                for (let att in newComponent.style.inline) {
                    render.style[att] = newComponent.style.inline[att];
                }
            } else {
                if (component.style) {
                    if (component.style.inline) {
                        for (let att in component.style.inline) {
                            render.style[att] = "";
                        }
                    }
                }
            }
        } else {
            if (component.style) {
                if (component.style.inline) {
                    for (let att in component.style.inline) {
                        render.style[att] = "";
                    }
                }
            }
        }

        return didUpdate;
    },
    /**
     * Update component's children
     * @param {CreateComponent} component old component
     * @param {CreateComponent} newComponent new component
     * @param {HTMLElement} render rendered htmlElement
     */
    children: (component, newComponent) => {
        // Check for a missing node element.
        // rerender the whole component tree if an element is missing
        for (let i in component.children) {
            if (!document.contains(component.children[i].domInstance)) {
                component.$replaceInDOM(newComponent);
                return;
            }
        }

        // Check for mapping
        if (component.map && newComponent.map) {
            for (let key in component.map) {
                if (!newComponent.map[key]) {
                    component.map[key].c.$removeFromDOM();
                    delete component.map[key];
                }
            }

            for (let key in component.map) {
                component.map[key].c.update(newComponent.map[key].c);
            }

            for (let key in newComponent.map) {
                if (!component.map[key]) {
                    component.map[key] = {
                        ...newComponent.map[key],
                        i: Object.keys(component.map).length,
                    };
                    newComponent.map[key].c.$appendInDOM(component);
                }
            }

            for (let key in component.map) {
                if (component.map[key].i !== newComponent.map[key].i)
                    component.map[key].c.$changePosition(component, newComponent.map[key].i);
            }
        } else {
            function compareEqualChildren() {
                for (let i = 0; i < component.children.length; i++) {
                    component.children[i].update(newComponent.children[i]);
                }
            }

            if (component.children.length === newComponent.children.length) {
                compareEqualChildren();
            }
            // if component.children are greater than newComponent.children
            else if (component.children.length > newComponent.children.length) {
                while (component.children.length > newComponent.children.length) {
                    component.children.pop().$removeFromDOM();
                }
                compareEqualChildren();
            }
            // if component.children are less than newComponent.children
            else {
                for (let i = component.children.length; i < newComponent.children.length; i++) {
                    newComponent.children[i].$appendInDOM(component);
                }
                compareEqualChildren();
            }
        }
    },
    /**
     * Update component's Events
     * @param newComponent new component
     * @param render rendered htmlElement
     */
    events: (newComponent, render) => {
        function updateEvent(prop) {
            render.events[prop] = newComponent.events[prop];
        }

        if (newComponent.events) {
            if (!render.events) {
                render.events = {};
            }

            for (let event in newComponent.events) {
                if (!render.events[event]) {
                    render.addEventListener(PropList.Events[event].listener, (e) => {
                        requestBatchingStart(`event-${event}`);

                        render.events[event](e);

                        requestBatchingEnd(`event-${event}`);
                    });
                }
                updateEvent(event);
            }

            for (let event in render.events) {
                if (!newComponent.events[event]) {
                    render.events[event] = () => {};
                }
            }
        } else {
            render.events = {};
        }
    },
};
