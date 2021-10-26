import applyinlinestyle from "../applystyle/applyinlinestyle.js";
import attributes from "../../../vdom/props/attributes.js";

/**
 * Apply component attributes into the rendered element.
 * @param component CreateComponent
 * @param render htmlElement
 */
export default (component, render) => {
     function renderAttr(attr) {
          if (component[attr]) {
               render[attr] = component[attr];
          }
     }

     attributes.forEach((attr) => {
          renderAttr(attr);
     });

     if (component.inlineStyle) {
          applyinlinestyle(component.inlineStyle, render.style);
     }
};
