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
          if (newComponent.props[attr]) {
               render[attr] = newComponent.props[attr];
          } else {
               render[attr] = "";
          }
          didUpdate = true;
     }

     for (let prop in newComponent.props) {
          if (attributes[prop]) {
               if (component.props[prop] !== newComponent.props[prop]) {
                    updateAttr(prop);
               }
          }
     }

     for (let prop in component) {
          if (attributes[prop] && !newComponent.props[prop]) {
               render[prop] = "";
          }
     }

     updateinlinestyle(newComponent.style, component.style, render);

     return didUpdate;
};
