import attributes from "../../../vdom/props/attributes.js";
import updateinlinestyle from "./updateinlinestyle.js";

/**
 * Update component's attributes
 * @param component old component
 * @param newComponent new component
 * @param render rendered htmlElement
 */
export default (component, newComponent, render) => {
     let didUpdate = false;

     function updateAttr(attr) {
          if (newComponent[attr]) {
               render[attr] = newComponent[attr];
          } else {
               render[attr] = "";
          }
          didUpdate = true;
     }

     for (let prop in newComponent) {
          if (attributes[prop]) {
               if (component[prop] !== newComponent[prop]) {
                    updateAttr(prop);
               }
          }
     }

     for (let prop in component) {
          if (attributes[prop] && !newComponent[prop]) {
               render[prop] = "";
          }
     }

     updateinlinestyle(newComponent.style, component.style, render);

     return didUpdate;
};
