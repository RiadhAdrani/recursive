import {
    requestBatchingEnd,
    requestBatchingStart,
} from "../../recursive-orchestrator/RecursiveOrchestrator.js";
import RecursiveDOMEvents from "../../recursive-dom/RecursiveDOMEvents.js";
import RecursiveAttributes from "../../recursive-dom/RecursiveDOMAttributes.js";

export default {
    /**
     * Apply component attributes into the rendered element.
     * @param component CreateComponent
     * @param element element
     */
    attributes: (component, element) => {
        for (let p in component.props) {
            element[RecursiveAttributes[p]] = component.props[p];
        }

        if (component.style) {
            if (component.style.inline) {
                for (let att in component.style.inline) {
                    element.style[att] = component.style.inline[att];
                }
            }
        }
    },
    /**
     * Render children into the element
     * @param children children to be injected
     * @param element element
     */
    children: (component, element) => {
        component.children.forEach((child) => {
            element.append(child.render());
        });
    },
    /**
     * Apply events to the rendered element
     * @param component CreateComponent
     * @param element rendered element
     */
    events: (component, element) => {
        if (component.events) {
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

            for (var event in component.events) {
                if (RecursiveDOMEvents[event]) {
                    addEvent(event, component.events[event]);
                }
            }
        }
    },
};
