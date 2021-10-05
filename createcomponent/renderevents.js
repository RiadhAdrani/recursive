import events from "./events.js";

/**
 * Apply events to the rendered element
 * @param component CreateComponent
 * @param htmlElement rendered element
 */
export default (component, htmlElement) => {
     if (component.events) {
          function addEvent(prop, event) {
               if (component.events[prop]) {
                    htmlElement.events[prop] = component.events[prop];

                    htmlElement.addEventListener(event, (e) => {
                         htmlElement.events[prop](e);
                    });
               }
          }

          htmlElement.events = {};

          events.forEach((event) => {
               addEvent(event.prop, event.event);
          });
     }
};
