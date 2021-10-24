import events from "../../../vdom/props/events.js";

/**
 * Apply events to the rendered element
 * @param component CreateComponent
 * @param htmlElement rendered element
 */
export default (component, htmlElement) => {
     if (component.events) {
          function addEvent(prop, event) {
               htmlElement.events[prop] = event;

               htmlElement.addEventListener(events[prop], (e) => {
                    htmlElement.events[prop](e);
               });
          }

          htmlElement.events = {};

          for (var event in component.events) {
               if (events[event]) {
                    addEvent(event, component.events[event]);
               } else {
                    console.warn(`[EVENT]: ${event} is not a valid event name.`);
               }
          }
     }
};
