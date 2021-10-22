import events from "../../vdom/props/events.js";

/**
 * Update component's Events
 * @param component old component
 * @param newComponent new component
 * @param render rendered htmlElement
 */
export default (newComponent, render) => {
     function updateEvent(prop) {
          if (newComponent.events[prop]) {
               render.events[prop] = newComponent.events[prop];
          } else {
               render.events[prop] = () => {};
          }
     }

     if (newComponent.events) {
          if (!render.events) {
               render.events = {};
          }

          events.forEach((event) => {
               updateEvent(event.prop);
          });
     } else {
          render.events = {};
     }
};
