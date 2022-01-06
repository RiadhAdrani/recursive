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

          if (component.inlineStyle) {
               for (let prop in component.inlineStyle) {
                    if (element.style.hasOwnProperty(prop)) {
                         element.style[prop] = component.inlineStyle[prop];
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

                    element.addEventListener(PropList.Events[prop].listener, (e) => {
                         element.events[prop](e);
                    });
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
