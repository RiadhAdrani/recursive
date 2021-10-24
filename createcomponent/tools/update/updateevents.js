/**
 * Update component's Events
 * @param newComponent new component
 * @param render rendered htmlElement
 */
export default (newComponent, render) => {
     function updateEvent(prop) {
          render.events[prop] = newComponent.events[prop];
     }

     if (newComponent.events) {
          if (!render.events) {
               render.events = {};
          }

          for (let event in render.events) {
               if (!newComponent.events[event]) {
                    render.events[event] = () => {};
               }
          }

          for (let event in newComponent.events) {
               updateEvent(event);
          }
     } else {
          render.events = {};
     }
};
