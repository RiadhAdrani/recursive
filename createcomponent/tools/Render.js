import PropList from "../../vdom/PropList.js";
import Style from "./Style.js";

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
               Style.applyInline(component.inlineStyle, element.style);
          }
     },
     /**
      * Render children into the element
      * @param children children to be injected
      * @param element element
      */
     children: (component, element) => {
          component.children.forEach((child) => {
               element.append(child.$$createcomponent ? child.render() : child);
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

                    element.addEventListener(PropList.Events[prop], (e) => {
                         element.events[prop](e);
                    });
               }

               element.events = {};

               for (var event in component.events) {
                    if (PropList.Events[event]) {
                         addEvent(event, component.events[event]);
                    } else {
                         console.warn(`[EVENT]: ${event} is not a valid event name.`);
                    }
               }
          }
     },
};
