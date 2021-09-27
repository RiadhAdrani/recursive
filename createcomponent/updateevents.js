import events from "./events.js";

export default (newComponent, render) => {
     if (newComponent.events) {
          function updateEvent(prop) {
               if (newComponent.events[prop]) {
                    render.events[prop] = newComponent.events[prop];
               } else {
                    render.events[prop] = () => {};
               }
          }

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
