import CreateComponent from "../../CreateComponent.js";
import all from "../../../vdom/props/events.js";

function InvalidEvent(event, message) {
     throw (() => {
          const error = new Error(`${event} ${message}`);
          error.name = "EVENTS";
          `${event} ${message}`;
          return error;
     })();
}

/**
 * @param {CreateComponent} component - to be initialized
 * @param {JSON} events - events to be injected
 * @throws an error whenever an event is not a function or doesn't have a valid name
 */
export default (component, events) => {
     for (var event in events) {
          if (all[event]) {
               if (typeof events[event] === "function") {
                    component.events[event] = events[event];
               } else {
                    InvalidEvent(event, "is not a function");
               }
          } else {
               InvalidEvent(event, "is not a valid event name.");
          }
     }
};
