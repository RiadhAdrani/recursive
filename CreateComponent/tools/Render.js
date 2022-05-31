import {
    requestBatchingEnd,
    requestBatchingStart,
    requestUpdate,
} from "../../RecursiveOrchestrator/RecursiveOrchestrator.js";
import PropList from "../../RecursiveDOM/PropList.js";

export default {
    /**
     * Apply component attributes into the rendered element.
     * @param component CreateComponent
     * @param element element
     */
    attributes: (component, element) => {
        for (let p in component.props) {
            element[PropList.Attributes[p]] = component.props[p];
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

                if (PropList.Events[prop].handler) {
                    PropList.Events[prop].handler(element);
                } else {
                    element.addEventListener(PropList.Events[prop].listener, (e) => {
                        requestBatchingStart(`event-${prop}`);

                        element.events[prop](e);

                        requestBatchingEnd(`event-${prop}`);
                    });
                }
            }

            element.events = {};

            for (var event in component.events) {
                if (PropList.Events[event]) {
                    addEvent(event, component.events[event]);
                }
            }
        }
    },
};
